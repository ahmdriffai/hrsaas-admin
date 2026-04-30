import { z } from "zod/v3";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["ADMIN", "USER"]),
  company_id: z.string(),
  created_at: z.number(),
  updated_at: z.number(),
});

export const AuthSchema = z.object({
  user: UserSchema,
  token: z.string().min(10, "Token tidak ada"),
});

export const SignInRequestSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(4, "Minimal 4 karakter"),
});

export type User = z.infer<typeof UserSchema>;
export type Auth = z.infer<typeof AuthSchema>;
export type SignInRequest = z.infer<typeof SignInRequestSchema>;
