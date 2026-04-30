import { PaginatedData } from "@/lib/response";
import { useQuery } from "@tanstack/react-query";
import { SearchTimeOffRequest, TimeOff } from "../schemas/time-off-schema";
import { searchTimeOff } from "../services/search-time-off";

export function useSearchTimeOffReq(search: SearchTimeOffRequest) {
  return useQuery<PaginatedData<TimeOff>>({
    queryKey: ["time-off-requests", search],
    queryFn: async () => searchTimeOff(search),
    retry: 2,
    placeholderData: (prev) => prev,
  });
}
