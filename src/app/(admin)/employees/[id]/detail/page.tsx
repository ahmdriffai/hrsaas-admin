import GeneralEmployee from "@/features/employee/components/detail/general-employee";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DetailEmployeePage({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <GeneralEmployee id={id} />
    </div>
  );
}
