import Title from "@/components/ui/title/title";
import ListTimeOffRequest from "@/features/time-off-request/components/list-time-off";
import MenuTimeOffRequest from "@/features/time-off-request/components/menu-time-off";
import { SearchTimeOffRequest } from "@/features/time-off-request/schemas/time-off-schema";
import { serverApi } from "@/lib/server-api";
import { getQueryclient } from "@/providers/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type React from "react";

type Props = {
  searchParams: Promise<{
    page?: string;
    size?: string;
    employee_id?: string;
    start_date?: string;
    end_date?: string;
    request_status?: string;
  }>;
};
export default async function TimeOffRequestPage({
  searchParams,
}: Props): Promise<React.ReactNode> {
  const params = await searchParams;
  const page = params.page || 1;
  const size = params.size || 10;
  const employee_id = params.employee_id || "";
  const start_date = params.start_date || "";
  const end_date = params.end_date || "";
  const request_status = params.request_status || "";

  const search: SearchTimeOffRequest = {
    page: Number(page),
    size: Number(size),
    employee_id: employee_id,
    start_date: start_date,
    end_date: end_date,
    request_status: request_status,
  };

  const queryClient = getQueryclient();

  await queryClient.prefetchQuery({
    queryKey: ["time-off-requests", search],
    queryFn: () =>
      serverApi("time-off-requests", {
        page: search.page,
        size: search.size,
        employee_id: search.employee_id,
        start_date: search.start_date,
        end_date: search.end_date,
        request_status: search.request_status,
      }),
  });

  return (
    <>
      <Title title="Pengajuan cuti karyawan" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MenuTimeOffRequest search={search} />
        <ListTimeOffRequest search={search} />
      </HydrationBoundary>
    </>
  );
}
