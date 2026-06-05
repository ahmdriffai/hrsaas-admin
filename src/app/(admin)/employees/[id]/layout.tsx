import Tabs from "@/components/shared/tabs/tabs";
import Title from "@/components/ui/title/title";
import ProfileDetailEmployee from "@/features/employee/components/detail/profile-employee";
import { Tab } from "@/lib/type";

type Props = {
  params: Promise<{
    id: string;
  }>;
  children: React.ReactNode;
};

export default async function LayoutDetailEmployee({
  params,
  children,
}: Props) {
  const { id } = await params;
  const tabs: Tab[] = [
    { label: "General", path: `/employees/${id}/detail` },
    { label: "Kontrak Kepegawaian", path: `/employees/${id}/contract` },
    { label: "Kuota Cuti", path: `/employees/${id}/time-off-balance` },
    { label: "Dokumen", path: `/employees/${id}/docs` },
    { label: "Kehadiran", path: `/employees/${id}/attendance` },
    { label: "Sanksi", path: `/employees/${id}/sanction` },
  ];

  return (
    <>
      <Title title="Detail karyawan" previus="/employees" />
      <div className="flex flex-col md:flex-row gap-4">
        {/* profile */}
        <ProfileDetailEmployee id={id} />

        {/* detail */}

        <div className="w-full max-w-3xl bg-white p-6 border rounded-2xl">
          <Tabs tabs={tabs} />
          {children}
        </div>
      </div>
    </>
  );
}
