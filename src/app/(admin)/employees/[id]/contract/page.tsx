import JobEmployee from "@/features/employee/components/detail/job-employee";
type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DetailEmployeePage({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <JobEmployee id={id} />
    </div>
  );
}
