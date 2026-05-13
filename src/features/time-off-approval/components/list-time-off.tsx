"use client";

import { Pagination } from "@/components/shared/pagination/pagination";
import Table from "@/components/ui/table/table";

import { PageSelector } from "@/components/shared/page-selector/page-selector";
import Badge from "@/components/ui/badge/badge";
import Button from "@/components/ui/button/button";
import toIDDate from "@/lib/utils";
import { Info, Printer } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchTimeOffAppr } from "../hooks/use-search-timeoffappr";
import { SearchTimeOffApproval } from "../schemas/time-off-approval-schema";
import ActionTimeOffAppr from "./action-time-offappr";

interface Props {
  search: SearchTimeOffApproval;
}

export default function ListTimeOffApproval({
  search,
}: Props): React.ReactNode {
  const router = useRouter();

  const { data, isLoading, isFetching } = useSearchTimeOffAppr(search);

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
              <div className="flex items-center justify-start gap-3 min-w-50">
                <div className="h-9 w-9 rounded-full bg-gray-200 flex justify-center items-center">
                  {row.time_off_request.employee.fullname
                    .charAt(0)
                    .toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium ">
                    {row.time_off_request.employee.fullname}
                  </span>
                  <span className="text-xs font-light text-zinc-400">
                    {row.time_off_request.employee.contract?.[0].position.name}{" "}
                    -{row.time_off_request.employee.contract?.[0].division.name}
                  </span>
                </div>
              </div>
            ),
          },

          {
            header: "Total Hari",
            accessor: (row) => (
              <div className="space-y-1">
                <p className="border-b font-semibold">
                  {row.time_off_request.requested_days} hari
                </p>
                <div className="font-semibold text-zinc-400 text-xs flex flex-col">
                  <span>
                    {toIDDate(new Date(row.time_off_request.start_date))}
                  </span>
                  <span>s/d</span>
                  <span>
                    {toIDDate(new Date(row.time_off_request.end_date))}
                  </span>
                </div>
              </div>
            ),
          },
          {
            header: "Jenis Cuti",
            accessor: (row) => (
              <div>
                <p className="font-medium">
                  {row.time_off_request.time_off_type.name}{" "}
                </p>
              </div>
            ),
          },
          {
            header: "Status",
            accessor: (row) => (
              <Badge
                variant={
                  row.status === "PENDING"
                    ? "warning"
                    : row.status === "REJECTED"
                      ? "danger"
                      : "success"
                }
              >
                {row.status}
              </Badge>
            ),
          },
          {
            header: "Detail",
            accessor: () => (
              <Button
                size="sm"
                variant="outline"
                suffixIcon={<Info size={16} />}
              >
                Lihat
              </Button>
            ),
          },
          {
            header: "Action",
            accessor: (row) => (
              <div className="flex gap-3 items-center">
                {row.status === "PENDING" ? (
                  <ActionTimeOffAppr id={row.id} />
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    suffixIcon={<Printer size={16} />}
                  >
                    Cetak bukti
                  </Button>
                )}
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
