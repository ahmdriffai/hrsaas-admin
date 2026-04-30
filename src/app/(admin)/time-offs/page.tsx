import Title from "@/components/ui/title/title";
import ListTimeOffRequest from "@/features/time-off-request/components/list-time-off";
import { SearchTimeOffRequest } from "@/features/time-off-request/schemas/time-off-schema";
import { getQueryclient } from "@/providers/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type React from "react";

type Props = {
  searchParams: Promise<{
    page?: string;
    size?: string;
  }>;
};
export default async function TimeOffRequestPage({
  searchParams,
}: Props): Promise<React.ReactNode> {
  const params = await searchParams;
  const page = params.page || 1;
  const size = params.size || 10;

  const search: SearchTimeOffRequest = {
    page: Number(page),
    size: Number(size),
  };

  const queryClient = getQueryclient();

  await queryClient.prefetchQuery({
    queryKey: ["time-off-requests", search.page, search.size],
    queryFn: async () => {
      const res = await fetch(
        `/api/time-off-requests?page=${search.page}&size=${search.size}`,
      );
      return res.json();
    },
  });

  return (
    <>
      <Title title="Pengajuan cuti karyawan" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ListTimeOffRequest search={search} />
      </HydrationBoundary>
    </>
  );
}
