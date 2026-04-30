"use client";
import ImageViewer from "@/components/ui/image-viewer/image-viewer";
import { Globe, Mail, Phone } from "lucide-react";
import React from "react";
import { useDetailEmployee } from "../../hooks/use-detail-employee";

interface Props {
  id: string;
}

export default function ProfileEmployee({ id }: Props): React.ReactNode {
  const { data } = useDetailEmployee(id);
  const employee = data?.data;
  return (
    <div className="p-6 w-sm bg-white border rounded-2xl h-fit">
      {/* image */}
      <div className="flex justify-center items-center flex-col gap-4 border-b pb-3">
        <ImageViewer
          width={100}
          height={100}
          circle
          src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
        />
        <h2 className="font-semibold text-2xl text-center">
          {employee?.fullname}
        </h2>
        <p>{employee?.contract.position.name}</p>
      </div>
      <div className="mt-6 space-y-5">
        <div className="flex gap-2 items-center">
          <Mail size={16} className="text-zinc-400" />{" "}
          <span className="text-sm">{employee?.user.email}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Phone size={16} className="text-zinc-400" />{" "}
          <span className="text-sm">{employee?.phone}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Globe size={16} className="text-zinc-400" />{" "}
          <span className="text-sm">{employee?.timezone}</span>
        </div>
      </div>
    </div>
  );
}
