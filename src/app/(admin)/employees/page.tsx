import Title from "@/components/ui/title/title";
import ListEmployee from "@/features/employee/components/list-employee";
import MenuEmployee from "@/features/employee/components/menu-employee";
import { SearchEmployeeRequest } from "@/features/employee/schemas/employee-schema";
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

  const search: SearchEmployeeRequest = {
    key: key,
    page: Number(page),
    size: Number(size),
  };

  const queryClient = getQueryclient();
  const cookieStore = cookies();
  await queryClient.prefetchQuery({
    queryKey: ["employees", search.key, search.page, search.size],
    queryFn: async () => {
      const response = await api.get("/employees", {
        params: {
          key: search.key,
          type: search.type,
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
      <Title title="Data karyawan" />
      <MenuEmployee />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ListEmployee search={search} />
      </HydrationBoundary>
    </>
  );
}
