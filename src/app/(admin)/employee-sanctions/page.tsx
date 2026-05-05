import Title from "@/components/ui/title/title";
import ListSanction from "@/features/employee-sanction/components/list-employee-sanction";
import SearchEmployeeSanction from "@/features/employee-sanction/components/search-employee-sanction";
import { SearchEmployeeSanctionRequest } from "@/features/employee-sanction/schemas/employee-sanction-schema";
import { getQueryclient } from "@/providers/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Props = {
  searchParams: Promise<{
    page?: string;
    size?: string;
    employee_id?: string;
    sanction_id?: string;
    reason?: string;
    start_date?: string;
    end_date?: string;
    status?: string;
  }>;
};

export default async function EmployeeSanctionPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = params.page || 1;
  const size = params.size || 10;

  const search: SearchEmployeeSanctionRequest = {
    page: Number(page),
    size: Number(size),
    employee_id: params.employee_id,
    sanction_id: params.sanction_id,
    reason: params.reason,
    start_date: params.start_date,
    end_date: params.end_date,
    status:
      params.status === "active"
        ? true
        : params.status === "inactive"
          ? false
          : undefined,
  };

  const queryClient = getQueryclient();

  await queryClient.prefetchQuery({
    queryKey: ["employee-sanctions", search],
    queryFn: async () => {
      const res = await fetch(
        `/api/employee-sanctions?page=${search.page}&size=${search.size}`,
      );
      return res.json();
    },
  });

  return (
    <>
      <Title title="Surat Peringatan Karyawan" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchEmployeeSanction search={search} />
        <ListSanction search={search} />
      </HydrationBoundary>
    </>
  );
}
