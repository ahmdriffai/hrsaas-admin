"use client";

import { Pagination } from "@/components/shared/pagination/pagination";
import Button from "@/components/ui/button/button";
import Table from "@/components/ui/table/table";

import { PageSelector } from "@/components/shared/page-selector/page-selector";
import Badge from "@/components/ui/badge/badge";
import toIDDate from "@/lib/utils";
import { Check, Printer } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchTimeOffReq } from "../hooks/use-search-timeoffreq";
import { SearchTimeOffRequest } from "../schemas/time-off-schema";

interface Props {
  search: SearchTimeOffRequest;
}

export default function ListTimeOffRequest({ search }: Props): React.ReactNode {
  const router = useRouter();

  const { data, isLoading, isFetching } = useSearchTimeOffReq(search);

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
            header: "Karyawan",
            accessor: (row) => (
              <div className="flex items-center justify-start gap-3 min-w-40">
                <div className="h-9 w-9 rounded-full bg-gray-200 flex justify-center items-center">
                  {row.employee.fullname.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium ">{row.employee.fullname}</span>
                  <span className="text-xs font-light text-zinc-400">
                    {row.employee.contract?.[0].position.name} -
                    {row.employee.contract?.[0].division.name}
                  </span>
                </div>
              </div>
            ),
          },
          {
            header: "Tgl Mulai",
            accessor: (row) => (
              <div>
                <p>{toIDDate(new Date(row.start_date))}</p>
              </div>
            ),
          },
          {
            header: "Tgl Ahir",
            accessor: (row) => (
              <div>
                <p>{toIDDate(new Date(row.end_date))}</p>
              </div>
            ),
          },
          {
            header: "Total Hari",
            accessor: (row) => (
              <div>
                <p>{row.requested_days} hari</p>
              </div>
            ),
          },

          {
            header: "Status",
            accessor: (row) => (
              <Badge
                variant={
                  row.request_status === "PENDING"
                    ? "warning"
                    : row.request_status === "REJECTED"
                      ? "danger"
                      : "success"
                }
              >
                {row.request_status}
              </Badge>
            ),
          },
          {
            header: "Approval",
            accessor: (row) => (
              <div className="min-w-30">
                {row.approvals.map((item, i) => (
                  <div key={i} className="flex">
                    <p className="font-medium flex items-center gap-2">
                      {item.employee_name}
                      {item.status === "APPROVED" && (
                        <Check size={13} className="text-green-600" />
                      )}
                    </p>
                  </div>
                ))}
              </div>
            ),
          },

          {
            header: "Action",
            accessor: () => (
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  asChild
                  prefixIcon={<Printer size={16} />}
                >
                  Print
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
              Menampilkan {data?.data?.length} dari {data?.paging?.total_item}{" "}
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
