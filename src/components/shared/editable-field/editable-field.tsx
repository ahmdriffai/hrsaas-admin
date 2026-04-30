"use client";

import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import { PenLine } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  label: string;
  value?: string;
  placeholder?: string;
  hint?: string;
  onSave?: (value: string) => void;
};

export default function EditableField({
  label,
  value = "",
  placeholder,
  hint,
  onSave,
}: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalValue(value || "");
  }, [value]);

  const handleSave = () => {
    onSave?.(localValue);
    setIsEdit(false);
  };

  return (
    <div className="flex flex-col w-full justify-start items-center pb-6 border-b border-gray-200">
      {/* Header */}
      <div className="flex w-full justify-between gap-y-1">
        <label className="text-md font-semibold">{label}</label>
        <Button
          variant={isEdit ? "link" : "ghost"}
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? "Batal" : <PenLine size={15} />}
        </Button>
      </div>

      {/* Content */}
      <div className="flex w-full justify-start mt-1">
        {isEdit ? (
          <div className="w-full space-y-3">
            {hint && (
              <p className="text-sm text-gray-400 font-extralight">{hint}</p>
            )}

            <Input
              label={label}
              value={localValue}
              placeholder={placeholder}
              onChange={(e) => setLocalValue(e.target.value)}
            />

            <Button variant="secondary" onClick={handleSave}>
              Simpan
            </Button>
          </div>
        ) : (
          <p className="text-sm text-gray-500">{value || "-"}</p>
        )}
      </div>
    </div>
  );
}
