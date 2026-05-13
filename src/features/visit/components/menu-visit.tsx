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
import { SearchVisitRequest } from "../schemas/visit-schema";

interface Props {
  search: SearchVisitRequest;
}

export default function MenuVisit({ search }: Props): React.ReactNode {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [employeeID, setEmployeeID] = useState<string>(
    search.employee_id ?? "",
  );
  const [dateRange, setDateRange] = useState<DateRange>({
    start: search.start_date ? parseISO(search.start_date) : null,
    end: search.end_date ? parseISO(search.end_date) : null,
  });
  const [sortBy, setSortBy] = useState<string>(search.sort_by ?? "");

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

  function handleSelectEmployee(data: string) {
    setEmployeeID(data);
    updateQuery({ employee_id: data || null });
  }

  function handleDateRange(range: DateRange) {
    setDateRange(range);
    updateQuery({
      start_date: range.start ? format(range.start, "yyyy-MM-dd") : "",
      end_date: range.end ? format(range.end, "yyyy-MM-dd") : "",
    });
  }

  function handleSortBy(data: string) {
    setSortBy(data);
    updateQuery({ sort_by: data || null });
  }

  return (
    <div className="mb-4 bg-white border rounded-2xl p-5 space-y-4">
      <p className="font-semibold text-gray-700">Filter</p>
      <div className="flex flex-wrap gap-4">
        <div className="w-56">
          <SelectSearch
            label="Cari karyawan"
            options={options}
            value={employeeID}
            onChange={handleSelectEmployee}
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
            label="Urutkan"
            options={[
              { label: "Terbaru", value: "newest" },
              { label: "Terlama", value: "oldest" },
            ]}
            value={sortBy}
            onChange={handleSortBy}
          />
        </div>
      </div>
    </div>
  );
}
