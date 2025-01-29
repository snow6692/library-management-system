import { z } from "zod";

export const singUpSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Email is required" }),
  universityId: z.coerce
    .number()
    .min(2, { message: "universityId is required" }),
  universityCard: z.string().min(2, { message: "University card is required" }),
  password: z.string().min(8, { message: "Password at least 8 characters" }),
});

export type singUpSchema = z.infer<typeof singUpSchema>;

export const signInSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(8, { message: "Password at least 8 characters" }),
});

export type signInSchema = z.infer<typeof signInSchema>;
