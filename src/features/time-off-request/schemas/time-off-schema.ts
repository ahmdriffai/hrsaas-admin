import { EmployeeSchema } from "@/features/employee/schemas/employee-schema";
import z from "zod/v3";

export const Approvals = z.object({
  employee_name: z.string(),
  is_required: z.boolean(),
  status: z.string(),
  action_at: z.number(),
  action_reason: z.string(),
});

export const TimeOffRequestSchema = z.object({
  id: z.string(),
  employee_id: z.string(),
  time_off_type_id: z.string(),
  start_date: z.number(),
  end_date: z.number(),
  requested_days: z.number(),
  request_reason: z.string(),
  request_status: z.string(),
  created_at: z.number(),
  employee: EmployeeSchema,
  time_off_type: z.object({
    id: z.string(),
    name: z.string(),
    category: z.string(),
    is_quota_based: z.boolean(),
    default_quota_days: z.number(),
  }),
  approvals: z.array(Approvals),
});

export const SearchTimeOffRequestSchema = z.object({
  employee_id: z.string().optional(),
  time_off_type_id: z.string().optional(),
  request_status: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
});

export type SearchTimeOffRequest = z.infer<typeof SearchTimeOffRequestSchema>;
export type TimeOffRequest = z.infer<typeof TimeOffRequestSchema>;
