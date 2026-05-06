import Title from "@/components/ui/title/title";
import ListSanctionType from "@/features/sanction-type/components/list-sanction-type";
import MenuSanctionType from "@/features/sanction-type/components/menu-sanction-type";
import { SearchSanctionTypeRequest } from "@/features/sanction-type/schemas/sanction-type-schema";
import { api } from "@/lib/axios";
import { getQueryclient } from "@/providers/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";

type Props = {
  searchParams: Promise<{
    key?: string;
    page?: string;
    size?: string;
  }>;
};

export default async function SanctionTypePage({
  searchParams,
}: Props): Promise<React.ReactNode> {
  const params = await searchParams;
  const key = params.key || "";
  const page = params.page || 1;
  const size = params.size || 10;

  const search: SearchSanctionTypeRequest = {
    key: key,
    page: Number(page),
    size: Number(size),
  };

  const queryClient = getQueryclient();
  const cookieStore = cookies();
  await queryClient.prefetchQuery({
    queryKey: ["sanction-types", search.key, search.page, search.size],
    queryFn: async () => {
      const response = await api.get("/sanction-types", {
        params: {
          key: search.key,
          page: search.page,
          size: search.size,
        },
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      return response.data.data;
    },
  });

  return (
    <>
      <Title title="Daftar jenis sanksi" />
      <MenuSanctionType />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ListSanctionType search={search} />
      </HydrationBoundary>
    </>
  );
}
