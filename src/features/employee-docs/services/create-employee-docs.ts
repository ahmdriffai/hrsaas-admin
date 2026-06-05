import { api } from "@/lib/axios";
import { CreateEmployeeDocument } from "../schemas/employee-docs-schema";

export const createEmployeeDocument = async (
  data: CreateEmployeeDocument,
): Promise<void> => {
  await api.post("/employee-docs", data);
};
