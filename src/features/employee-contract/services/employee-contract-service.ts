import { api } from "@/lib/axios";
import { PaginatedData, ResponseData } from "@/lib/response";
import {
  CreateEmployeeContract,
  EmployeeContract,
  SearchEmployeeContractRequest,
} from "../schemas/employee-contract-schema";

export const getEmployeeContracts = async (
  search: SearchEmployeeContractRequest,
): Promise<PaginatedData<EmployeeContract>> => {
  const response = await api.get("/employee-contracts", {
    params: {
      employee_id: search.employee_id,
      division_id: search.division_id,
      position_id: search.position_id,
      active_only: search.active_only,
      page: search.page,
      size: search.size,
    },
  });

  return { ...response.data, data: response.data.data };
};

export const createEmployeeContract = async (
  request: CreateEmployeeContract,
): Promise<ResponseData<EmployeeContract>> => {
  const response = await api.post("/employee-contracts", request);

  if (response.status !== 200) {
    throw new Error(response.data.error || "Gagal membuat kontrak karyawan");
  }

  return response.data;
};