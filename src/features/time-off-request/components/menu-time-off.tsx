"use client";

import SelectSearch from "@/components/ui/select-search/select-search";
import Select from "@/components/ui/select/select";
import { useGetEmployees } from "@/features/employee/hooks/use-get-employee";
import { mapToOptions } from "@/lib/utils";
import { CalendarDays, List } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SearchTimeOffRequest } from "../schemas/time-off-schema";
import { CreateTimeOffForm } from "./create-time-off";

interface Props {
  search: SearchTimeOffRequest;
  view: string;
}

export default function MenuTimeOffRequest({
  search,
  view,
}: Props): React.ReactNode {
  const searchParams = useSearchParams();
  const router = useRouter();

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

  function updateQuery(newParams: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    params.set("page", "1");
    params.set("size", "10");

    router.push(`?${params.toString()}`, { scroll: false });
  }

  function handleSelectEmployeeID(data: string) {
    setEmployeeID(data);
    updateQuery({ employee_id: data });
  }

  function handleSelectStatus(data: string) {
    setStatus(data);
    updateQuery({ request_status: data });
  }

  function setView(v: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", v);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="mb-4 flex flex-col items-start justify-between bg-white border rounded-2xl p-5 gap-6">
      <div className="flex gap-3 items-center justify-between w-full">
        {/* View toggle */}
        <div className="flex items-center gap-2 p-1 bg-zinc-100 rounded-xl">
          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              view !== "calendar"
                ? "bg-white shadow-sm text-black"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            <List className="w-4 h-4" />
            Tabel
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              view === "calendar"
                ? "bg-white shadow-sm text-black"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            Kalender
          </button>
        </div>

        <div className="flex items-center gap-2">
          <CreateTimeOffForm />
          {/* <Button variant="outline" size="sm">
            Download
          </Button> */}
        </div>
      </div>

      <div className="flex gap-5 flex-wrap">
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
