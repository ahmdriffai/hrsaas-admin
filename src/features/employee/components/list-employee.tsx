"use client";

import { Pagination } from "@/components/shared/pagination/pagination";
import Button from "@/components/ui/button/button";
import Table from "@/components/ui/table/table";
import { BadgeCheck, FileText } from "lucide-react";
import Link from "next/link";

import { PageSelector } from "@/components/shared/page-selector/page-selector";
import { useRouter } from "next/navigation";
import { useGetEmployees } from "../hooks/use-get-employee";
import { SearchEmployeeRequest } from "../schemas/employee-schema";

interface Props {
  search: SearchEmployeeRequest;
}
export default function ListEmployee({ search }: Props): React.ReactNode {
  const router = useRouter();

  const { data, isLoading, isFetching } = useGetEmployees(search);

  const handlePaginate = (number: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", number.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSize = (size: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("size", size);
    params.set("page", "1"); // reset page

    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table
        data={data?.data || []}
        keyExtractor={(row) => row.id}
        columns={[
          {
            header: "Name",
            accessor: (row) => (
              <div className="flex items-center justify-start gap-3 min-w-50">
                <div className="h-9 w-9 rounded-full bg-gray-200 flex justify-center items-center">
                  {row.fullname.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium ">{row.fullname}</span>
                <span>
                  <BadgeCheck size={15} color="green" />
                </span>
              </div>
            ),
          },
          {
            header: "Identitas",
            accessor: "employee_number",
          },

          {
            header: "Dokumen",
            accessor: () => (
              <Button variant="ghost">
                <Link href="/employee/files">
                  <FileText strokeWidth={1.25} size={20} />
                </Link>
              </Button>
            ),
          },

          {
            header: "Action",
            accessor: (row) => (
              <div className="flex items-center gap-2">
                <Button variant="link" asChild>
                  <Link href={`/employees/${row.id}/detail`}>Detail</Link>
                </Button>

                <Button variant="link" className="text-destructive! " asChild>
                  <Link href="/employees/edit">Delete</Link>
                </Button>
              </div>
            ),
            className: "text-right",
          },
        ]}
      />
      {data && (
        <div className="flex flex-col w-full gap-5 justify-cente items-end mt-5">
          <div className="flex w-full items-center justify-between gap-x-1">
            <p className="font-bold text-xs">
              Menampilkan {data?.data.length} dari {data?.paging.total_item}{" "}
              total data.
            </p>
            <PageSelector
              onValueChange={(size) => handleSize(size)}
              value={search.size?.toString() ?? "0"}
            />
          </div>
          <Pagination
            currentPage={Number(search.page)}
            paging={data.paging}
            onPageChange={(number) => handlePaginate(number)}
          />
        </div>
      )}
    </div>
  );
}
