"use client";

import Button from "@/components/ui/button/button";
import SelectSearch from "@/components/ui/select-search/select-search";
import Select from "@/components/ui/select/select";
import { useGetEmployees } from "@/features/employee/hooks/use-get-employee";
import { mapToOptions } from "@/lib/utils";
import { Download, Monitor } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SearchTimeOffRequest } from "../schemas/time-off-schema";

interface Props {
  search: SearchTimeOffRequest;
}
export default function MenuTimeOffRequest({ search }: Props): React.ReactNode {
  const searchParams = useSearchParams();
  const [employeeID, setEmployeeID] = useState<string>(
    search.employee_id ?? "",
  );

  const [status, setStatus] = useState<string>(search.request_status ?? "");

  const { data: employees } = useGetEmployees({ size: 500 });
  const options = mapToOptions(
    employees?.data ?? [],
    (p) => p.fullname,
    (p) => p.id,
  );

  const router = useRouter();

  function updateQuery(newParams: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // reset page kalau filter berubah
    params.set("page", "1");
    params.set("size", "10");

    router.push(`?${params.toString()}`, { scroll: false });
  }

  function handleSelectEmployeeID(data: string) {
    setEmployeeID(data);

    updateQuery({
      employee_id: data,
    });
  }

  function handleSelectStatus(data: string) {
    setStatus(data);

    updateQuery({
      request_status: data,
    });
  }

  return (
    <div className="mb-4 flex flex-col items-start justify-between bg-white border rounded-2xl p-5 gap-6  ">
      <div className="flex gap-3  items-center justify-center ">
        <Link href="/employees/create">
          <Button variant="outline" prefixIcon={<Monitor size={18} />}>
            Visual
          </Button>
        </Link>
        <Link href="/employees/create">
          <Button variant="outline" prefixIcon={<Download size={18} />}>
            Download
          </Button>
        </Link>
      </div>
      <div className="flex gap-5">
        <div className="w-60">
          <SelectSearch
            label="Cari karyawan"
            options={options}
            value={employeeID}
            onChange={(data) => handleSelectEmployeeID(data)}
          />
        </div>

        <div className="w-60">
          <Select
            label="Status"
            options={[
              { label: "Pending", value: "PENDING" },
              { label: "Disetujui", value: "APPROVED" },
              { label: "Ditolak", value: "REJECTED" },
            ]}
            value={status}
            onChange={handleSelectStatus}
          />
        </div>
      </div>
    </div>
  );
}
