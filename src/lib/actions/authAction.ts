"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "../rateLimit";
import { workflowClient } from "../workflow";
import config from "../config";

export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">,
) {
  const { email, password } = params;

  try {
    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return { success: false, error: "TOO_FAST" };
    }
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to sign in" };
  }
}

export async function singUp(params: AuthCredentials) {
  const { email, fullName, password, universityCard, universityId } = params;

  //get current ip address
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return { success: false, error: "TOO_FAST" };
  }
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, params.email))
    .limit(1);

  if (existingUser.length > 0)
    return { success: false, error: "User already exists" };

  const hashedPassword = await hash(password, 10);
  try {
    await db.insert(users).values({
      email,
      fullName,
      password: hashedPassword,
      universityCard,
      universityId,
    });
    //this will trigger the post request in route.ts
    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
      body: {
        email,
        fullName,
      },
    });
    await signInWithCredentials({ email, password });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to signup" };
  }
}
