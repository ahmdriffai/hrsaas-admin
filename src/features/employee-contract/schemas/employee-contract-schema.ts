import { DivisionSchema } from "@/features/division/schemas/division-schema";
import { PositionSchema } from "@/features/position/schemas/position-schema";
import z from "zod/v3";

export const EmployeeContractSchema = z.object({
  id: z.string(),
  employee_id: z.string(),
  contract_type: z.string(),
  start_date: z.number(),
  end_date: z.number().nullable().optional(),
  division_id: z.string(),
  position_id: z.string(),
  salary: z.number(),
  division: DivisionSchema,
  position: PositionSchema,
});

export const CreateEmployeeContractSchema = z.object({
  employee_id: z.string().min(1),
  contract_type: z.string().min(1, "Jenis kontrak wajib diisi"),
  start_date: z.string().min(1, "Tanggal mulai wajib diisi"),
  end_date: z.string().optional(),
  division_id: z.string().min(1, "Divisi wajib dipilih"),
  position_id: z.string().min(1, "Jabatan wajib dipilih"),
  salary: z.coerce.number().min(0, "Gaji tidak boleh negatif"),
});

export const SearchEmployeeContractRequestSchema = z.object({
  employee_id: z.string().optional(),
  division_id: z.string().optional(),
  position_id: z.string().optional(),
  active_only: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
});

export type EmployeeContract = z.infer<typeof EmployeeContractSchema>;
export type CreateEmployeeContract = z.infer<
  typeof CreateEmployeeContractSchema
>;
export type SearchEmployeeContractRequest = z.infer<
  typeof SearchEmployeeContractRequestSchema
>;
