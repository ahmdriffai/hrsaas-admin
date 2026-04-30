"use client";
import { Tab } from "@/lib/type";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const tabs: Tab[] = [
  { label: "Pengajuan Cuti", path: "/time-offs" },
  { label: "Persetujuan", path: "/time-off-approvals" },
  { label: "Jenis Cuti", path: "/time-off-types" },
  { label: "Kuota Cuti", path: "/time-off-balances" },
];

export default function TimeOffLayout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (url: string) =>
    pathname === url || pathname.startsWith(url + "/", 1);

  return (
    <div>
      <div className="w-full border-b mb-10">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => router.push(tab.path)}
              className={clsx(
                " border-black  pb-3 text-md transition-all",
                isActive(tab.path)
                  ? "text-black font-medium border-b-2"
                  : "text-gray-400 hover:text-black",
              )}
            >
              {tab.label}
              {tab.totalData! > 0 && (
                <span className="bg-destructive text-[11px] text-white p-1.5 rounded-full ms-1">
                  {tab.totalData}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Conten */}
      {children}
    </div>
  );
}
