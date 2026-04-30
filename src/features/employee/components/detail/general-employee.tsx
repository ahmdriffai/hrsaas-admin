"use client";
import EditableField from "@/components/shared/editable-field/editable-field";
import toIDDate, { diffDateDetail } from "@/lib/utils";
import React, { useState } from "react";
import { useDetailEmployee } from "../../hooks/use-detail-employee";
interface Props {
  id: string;
}

export default function GeneralEmployee({ id }: Props): React.ReactNode {
  const [editable, setEditable] = useState<{
    name: boolean;
    gender: boolean;
    birth_date: boolean;
  }>({ name: false, gender: false, birth_date: false });
  const { data } = useDetailEmployee(id);
  const employee = data?.data;
  return (
    <div className="border p-4 rounded-2xl">
      <div className="flex border-b pb-3 items-center justify-between">
        <h2 className="text-lg font-semibold">
          Informasi Karyawan{" "}
          <span className="text-sm font-normal">
            (
            {employee?.birth_date
              ? diffDateDetail(new Date(employee.birth_date), new Date())
                  .years + " Tahun"
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
        />
        <div className="grid grid-cols-2 gap-5">
          <EditableField
            label="Tempat Lahir"
            value={employee?.birth_place}
            hint="Pastikan tempat lahir sesuai"
          />
          <EditableField
            label="Tanggal lahir"
            value={
              employee?.birth_date
                ? toIDDate(new Date(employee.birth_date))
                : ""
            }
            hint="Pastikan tanggal lengkap sesuai"
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <EditableField
            label="Status Perkawinan"
            value={employee?.marital_status}
            hint="Pastikan status perkawinan sesuai"
          />
          <EditableField
            label="Golongan darah"
            value={employee?.blood_type}
            hint="Pastikan golangan darah sesuai"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <EditableField
            label="Nomer telepon"
            value={employee?.phone}
            hint="Pastikan nomer telepon sesuai"
          />
          <EditableField
            label="Agama"
            value={employee?.religion}
            hint="Pastikan agama sesuai"
          />
        </div>
      </div>
    </div>
  );
}
