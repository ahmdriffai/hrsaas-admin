"use client";

import DateRangePicker, {
  DateRange,
} from "@/components/shared/date-range-picker/date-range-picker";
import Button from "@/components/ui/button/button";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import Input from "../input/input";

interface Props {
  value?: DateRange;
  labelStart?: string;
  labelEnd?: string;
  onChange?: (date: DateRange) => void;
  className?: string;
}

const DESKTOP_PICKER_WIDTH = 680;

export default function InputDateRange({
  value,
  labelStart,
  labelEnd,
  onChange,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const formatDate = (date?: Date | null) => {
    if (!date) return "";
    return format(date, "dd/MM/yyyy");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleToggle() {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setAlignRight(window.innerWidth - rect.left < DESKTOP_PICKER_WIDTH);
    }
    setOpen((prev) => !prev);
  }

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <div className="flex gap-2">
        <Input
          label={labelStart ?? "Start"}
          value={formatDate(value?.start)}
          onClick={handleToggle}
          readOnly
          className="cursor-pointer"
        />
        <Input
          label={labelEnd ?? "End"}
          value={formatDate(value?.end)}
          onClick={handleToggle}
          readOnly
          className="cursor-pointer"
        />
      </div>

      {open && (
        <div
          className={`absolute z-50 mt-2 w-fit max-w-[calc(100vw-2rem)] md:min-w-150 overflow-x-auto rounded-2xl shadow-xl bg-white ${
            alignRight ? "right-0" : "left-0"
          }`}
        >
          <DateRangePicker
            value={value}
            onChange={(range) => {
              onChange?.(range);
              if (range.start && range.end) {
                setOpen(false);
              }
            }}
          />
          <div className="px-4 pb-4 flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                onChange?.({ start: null, end: null });
                setOpen(false);
              }}
            >
              Kosongkan tanggal
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
