"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";

export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">,
) {
  const { email, password } = params;

  try {
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
    await signInWithCredentials({ email, password });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to signup" };
  }
}
