"use client";

import { DateRange } from "@/components/shared/date-range-picker/date-range-picker";
import InputDateRange from "@/components/ui/input-date-range/input-date-range";
import SelectSearch from "@/components/ui/select-search/select-search";
import Select from "@/components/ui/select/select";
import { useGetEmployees } from "@/features/employee/hooks/use-get-employee";
import { mapToOptions } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useGetSanctionTypes } from "../hooks/use-get-sanction-types";
import { SearchEmployeeSanctionRequest } from "../schemas/employee-sanction-schema";
import { CreateEmployeeSanctionForm } from "./create-employee-sanction";

interface Props {
  search: SearchEmployeeSanctionRequest;
}

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export default function SearchEmployeeSanction({
  search,
}: Props): React.ReactNode {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [employeeID, setEmployeeID] = useState<string>(
    search.employee_id ?? "",
  );
  const [sanctionID, setSanctionID] = useState<string>(
    search.sanction_id ?? "",
  );
  const [reason, setReason] = useState<string>(search.reason ?? "");
  const [dateRange, setDateRange] = useState<DateRange>({
    start: search.start_date ? parseISO(search.start_date) : null,
    end: search.end_date ? parseISO(search.end_date) : null,
  });
  const [status, setStatus] = useState<string>(
    search.status === true
      ? "active"
      : search.status === false
        ? "inactive"
        : "",
  );

  const { data: employees } = useGetEmployees({ size: 500 });
  const employeeOptions = mapToOptions(
    employees?.data ?? [],
    (p) => p.fullname,
    (p) => p.id,
  );
  const { data: sanctionTypes } = useGetSanctionTypes();
  const sanctionOptions = mapToOptions(
    sanctionTypes?.data ?? [],
    (s) => s.name,
    (s) => s.id,
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

  function handleSelectEmployee(data: string) {
    setEmployeeID(data);
    updateQuery({ employee_id: data || null });
  }

  function handleSelectSanction(data: string) {
    setSanctionID(data);
    updateQuery({ sanction_id: data || null });
  }

  function handleDateRange(range: DateRange) {
    setDateRange(range);

    updateQuery({
      start_date: range.start ? format(range.start, "yyyy-MM-dd") : "",
      end_date: range.end ? format(range.end, "yyyy-MM-dd") : "",
    });
  }

  function handleStatus(val: string) {
    setStatus(val);
    updateQuery({ status: val || null });
  }

  return (
    <div className="mb-4 bg-white border rounded-2xl p-5 space-y-4">
      {/* Row atas: judul + tombol */}
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-700">Filter</p>
        <CreateEmployeeSanctionForm />
      </div>

      {/* Row bawah: filter fields */}
      <div className="flex flex-wrap gap-4">
        <div className="w-48">
          <SelectSearch
            label="Karyawan"
            options={employeeOptions}
            value={employeeID}
            onChange={handleSelectEmployee}
          />
        </div>
        <div className="w-48">
          <SelectSearch
            label="Jenis sanksi"
            options={sanctionOptions}
            value={sanctionID}
            onChange={handleSelectSanction}
          />
        </div>

        <InputDateRange
          labelStart="Tanggal mulai"
          labelEnd="Tanggal selesai"
          value={dateRange}
          onChange={handleDateRange}
        />
        <div className="w-48">
          <Select
            label="Status"
            options={STATUS_OPTIONS}
            value={status}
            onChange={handleStatus}
          />
        </div>
      </div>
    </div>
  );
}
