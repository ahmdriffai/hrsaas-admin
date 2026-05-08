import { z } from "zod/v3";

export const RoleSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  roles: z.array(RoleSchema),
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
export type Role = z.infer<typeof RoleSchema>;
export type Auth = z.infer<typeof AuthSchema>;
export type SignInRequest = z.infer<typeof SignInRequestSchema>;
