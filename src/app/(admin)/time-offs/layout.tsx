"use client";
import Tabs from "@/components/shared/tabs/tabs";
import { useSearchTimeOffAppr } from "@/features/time-off-approval/hooks/use-search-timeoffappr";
import { Tab } from "@/lib/type";

interface Props {
  children: React.ReactNode;
}

export default function TimeOffLayout({ children }: Props) {
  const { data: timeOffApproval } = useSearchTimeOffAppr({
    page: 1,
    size: 100,
    status: "PENDING",
  });
  const tabs: Tab[] = [
    { label: "Pengajuan Cuti", path: "/time-offs" },
    {
      label: "Persetujuan",
      path: "/time-offs/approvals",
      totalData: timeOffApproval?.data?.length,
    },
    { label: "Jenis Cuti", path: "/time-offs/types" },
  ];

  return (
    <div>
      <Tabs tabs={tabs} />
      {/* Conten */}
      {children}
    </div>
  );
}
