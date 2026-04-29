import Title from "@/components/ui/title/title";
import ListDivision from "@/features/division/components/list-division";
import MenuDivision from "@/features/division/components/menu-division";
import { SearchDivisionRequest } from "@/features/division/schemas/division-schema";
import { api } from "@/lib/axios";
import { getQueryclient } from "@/providers/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";

type Props = {
  searchParams: Promise<{
    key?: string;
    page?: string;
    size?: string;
  }>;
};
export default async function EmployeePage({
  searchParams,
}: Props): Promise<React.ReactNode> {
  const params = await searchParams;
  const key = params.key || "";
  const page = params.page || 1;
  const size = params.size || 10;

  const search: SearchDivisionRequest = {
    key: key,
    page: Number(page),
    size: Number(size),
  };

  const queryClient = getQueryclient();
  const cookieStore = cookies();
  await queryClient.prefetchQuery({
    queryKey: ["positions", search.key, search.page, search.size],
    queryFn: async () => {
      const response = await api.get("/positions", {
        params: {
          key: search.key,
          page: search.page,
          size: search.size,
        },
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      return response.data.data;
    },
  });

  return (
    <>
      <Title title="Daftar divisi" />
      <MenuDivision />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ListDivision search={search} />
      </HydrationBoundary>
    </>
  );
}
