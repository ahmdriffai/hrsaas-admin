import Title from "@/components/ui/title/title";
import ListTimeOffType from "@/features/time-off-type/components/list-time-off-type";
import MenuTimeOffType from "@/features/time-off-type/components/menu-time-off-type";
import { api } from "@/lib/axios";
import { getQueryclient } from "@/providers/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function TimeOffTypePage(): Promise<React.ReactNode> {
  const queryClient = getQueryclient();
  const cookieStore = cookies();

  await queryClient.prefetchQuery({
    queryKey: ["time-off-types"],
    queryFn: async () => {
      const response = await api.get("/time-off-types", {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      return response.data.data;
    },
  });

  return (
    <>
      <Title title="Daftar jenis cuti" />
      <MenuTimeOffType />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ListTimeOffType />
      </HydrationBoundary>
    </>
  );
}
