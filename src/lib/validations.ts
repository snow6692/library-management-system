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

export const bookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Title is required at least 2 chars" })
    .max(100),

  description: z
    .string()
    .trim()
    .min(10, { message: "Title is required at least 10 chars" })
    .max(1000),
  author: z
    .string()
    .trim()
    .min(2, { message: "Author is required at least 2 chars" })
    .max(100),
  genre: z
    .string()
    .trim()
    .min(2, { message: "Title is required at least 2 chars" })
    .max(50),

  rating: z
    .number()
    .min(1, { message: "Title is required at least 2 chars" })
    .max(5),

  totalCopies: z.coerce.number().int().positive().lte(10000),

  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$/),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10, { message: "At least 10  chars" }),
});

export type bookSchema = z.infer<typeof bookSchema>;
