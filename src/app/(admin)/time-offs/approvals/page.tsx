import Title from "@/components/ui/title/title";
import ListTimeOffApproval from "@/features/time-off-approval/components/list-time-off";
import { SearchTimeOffApproval } from "@/features/time-off-approval/schemas/time-off-approval-schema";
import { serverApi } from "@/lib/server-api";
import { getQueryclient } from "@/providers/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type React from "react";

type Props = {
  searchParams: Promise<{
    page?: string;
    size?: string;
  }>;
};

export default async function TimeOffApprovalPage({
  searchParams,
}: Props): Promise<React.ReactNode> {
  const params = await searchParams;
  const page = params.page || 1;
  const size = params.size || 10;

  const search: SearchTimeOffApproval = {
    page: Number(page),
    size: Number(size),
  };

  const queryClient = getQueryclient();

  await queryClient.prefetchQuery({
    queryKey: ["time-off-approvals", search],
    queryFn: () =>
      serverApi("time-off-approvals/_current", {
        page: search.page,
        size: search.size,
      }),
  });

  return (
    <>
      <Title title="Persetujuan cuti karyawan" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ListTimeOffApproval search={search} />
      </HydrationBoundary>
    </>
  );
}
