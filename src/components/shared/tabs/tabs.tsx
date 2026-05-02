"use client";
import { Tab } from "@/lib/type";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  tabs: Tab[];
}

export default function Tabs({ tabs }: Props) {
  const pathname = usePathname();
  const isActive = (url: string) =>
    pathname === url || pathname.startsWith(url + "/", 1);
  return (
    <div className="w-full border-b mb-10 overflow-scroll">
      <div className="flex gap-6 items-center">
        {tabs.map((tab) => (
          <Link
            href={tab.path}
            key={tab.label}
            className={clsx(
              " border-black pb-2 text-md transition-all",
              isActive(tab.path)
                ? "text-black font-medium border-b-2"
                : "text-gray-400 hover:text-black",
            )}
          >
            {tab.label}
            {tab.totalData! > 0 && (
              <span className="bg-destructive text-[11px] aspect-square text-white p-1.5 rounded-full ms-2">
                {tab.totalData}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
