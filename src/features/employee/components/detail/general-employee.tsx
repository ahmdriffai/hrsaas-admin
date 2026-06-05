"use client";
import EditableField from "@/components/shared/editable-field/editable-field";
import toIDDate, { diffDateDetail } from "@/lib/utils";
import React from "react";
import { useDetailEmployee } from "../../hooks/use-detail-employee";
import { useUpdateEmployee } from "../../hooks/use-update-employee";

const BLOOD_TYPE_OPTIONS = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "AB", value: "AB" },
  { label: "O", value: "O" },
];

const MARITAL_STATUS_OPTIONS = [
  { label: "Belum Menikah", value: "Belum Menikah" },
  { label: "Menikah", value: "Menikah" },
  { label: "Cerai", value: "Cerai" },
];

const RELIGION_OPTIONS = [
  { label: "Islam", value: "Islam" },
  { label: "Kristen", value: "Kristen" },
  { label: "Katolik", value: "Katolik" },
  { label: "Hindu", value: "Hindu" },
  { label: "Buddha", value: "Buddha" },
  { label: "Konghucu", value: "Konghucu" },
];

interface Props {
  id: string;
}

export default function GeneralEmployee({ id }: Props): React.ReactNode {
  const { data } = useDetailEmployee(id);
  const { mutate: updateEmployee } = useUpdateEmployee(id);
  const employee = data?.data;
  const birthDate = employee?.birth_date
    ? new Date(employee.birth_date)
    : undefined;

  return (
    <div className="border p-4 rounded-2xl">
      <div className="flex border-b pb-3 items-center justify-between">
        <h2 className="text-lg font-semibold">
          Informasi Karyawan{" "}
          <span className="text-sm font-normal">
            (
            {birthDate
              ? diffDateDetail(birthDate, new Date()).years + " Tahun"
              : ""}
            )
          </span>
        </h2>
      </div>
      <div className="w-full py-5 space-y-5">
        <EditableField
          label="Nama lengkap"
          value={employee?.fullname}
          hint="Pastikan nama lengkap sesuai"
          onSave={(value) => updateEmployee({ fullname: value })}
        />
        <div className="grid grid-cols-2 gap-5">
          <EditableField
            label="Tempat Lahir"
            value={employee?.birth_place}
            hint="Pastikan tempat lahir sesuai"
            onSave={(value) => updateEmployee({ birth_place: value })}
          />
          <EditableField
            type="date"
            label="Tanggal lahir"
            value={birthDate ? toIDDate(birthDate) : ""}
            dateValue={birthDate}
            hint="Pastikan tanggal lahir sesuai"
            onSave={(value) => updateEmployee({ birth_date: value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <EditableField
            type="select"
            label="Status Perkawinan"
            value={employee?.marital_status}
            options={MARITAL_STATUS_OPTIONS}
            hint="Pastikan status perkawinan sesuai"
            onSave={(value) => updateEmployee({ marital_status: value })}
          />
          <EditableField
            type="select"
            label="Golongan darah"
            value={employee?.blood_type}
            options={BLOOD_TYPE_OPTIONS}
            hint="Pastikan golongan darah sesuai"
            onSave={(value) => updateEmployee({ blood_type: value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <EditableField
            label="Nomer telepon"
            value={employee?.phone}
            hint="Pastikan nomer telepon sesuai"
            onSave={(value) => updateEmployee({ phone: value })}
          />
          <EditableField
            type="select"
            label="Agama"
            value={employee?.religion}
            options={RELIGION_OPTIONS}
            hint="Pastikan agama sesuai"
            onSave={(value) => updateEmployee({ religion: value })}
          />
        </div>
      </div>
    </div>
  );
}
