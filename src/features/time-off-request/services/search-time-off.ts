import { api } from "@/lib/axios";
import { PaginatedData } from "@/lib/response";
import { SearchTimeOffRequest, TimeOff } from "../schemas/time-off-schema";

export const searchTimeOff = async (
  search: SearchTimeOffRequest,
): Promise<PaginatedData<TimeOff>> => {
  const response = await api.get("/time-off-requests", {
    params: {
      employee_id: search.employee_id,
      time_off_type_id: search.time_off_type_id,
      request_status: search.request_status,
      page: search.page,
      size: search.size,
    },
  });

  const timeOffRequests = response.data.data; // Validate the response data against the schema

  return { ...response.data, data: timeOffRequests }; // Return the validated data
};
