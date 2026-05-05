"use client";

import Table from "@/components/ui/table/table";
import toIDDate from "@/lib/utils";
import { useGetEmployeeContracts } from "../hooks/use-get-employee-contracts";

interface Props {
  employeeId: string;
}

const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);

const isContractActive = (start: number, end?: number | null) => {
  const now = Date.now();
  return start <= now && (!end || end >= now);
};

export default function ListEmployeeContract({ employeeId }: Props) {
  const { data, isLoading } = useGetEmployeeContracts({
    employee_id: employeeId,
    page: 1,
    size: 50,
  });

  if (isLoading) return <div className="text-sm text-zinc-400 py-4">Memuat data...</div>;

  return (
    <Table
      data={data?.data ?? []}
      keyExtractor={(row) => row.id}
      columns={[
        {
          header: "Jenis Kontrak",
          accessor: (row) => (
            <span className="font-medium">{row.contract_type}</span>
          ),
        },
        {
          header: "Divisi",
          accessor: (row) => row.division.name,
        },
        {
          header: "Jabatan",
          accessor: (row) => row.position.name,
        },
        {
          header: "Tanggal Mulai",
          accessor: (row) => toIDDate(new Date(row.start_date)),
        },
        {
          header: "Tanggal Berakhir",
          accessor: (row) =>
            row.end_date ? toIDDate(new Date(row.end_date)) : (
              <span className="text-zinc-400 text-xs">Tidak ada</span>
            ),
        },
        {
          header: "Gaji",
          accessor: (row) => formatRupiah(row.salary),
        },
        {
          header: "Status",
          accessor: (row) => {
            const active = isContractActive(row.start_date, row.end_date);
            return (
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  active
                    ? "bg-green-100 text-green-700"
                    : "bg-zinc-100 text-zinc-500"
                }`}
              >
                {active ? "Aktif" : "Berakhir"}
              </span>
            );
          },
        },
      ]}
    />
  );
}
