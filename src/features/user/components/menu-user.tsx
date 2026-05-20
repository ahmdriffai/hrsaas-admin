"use client";
import SearchForm from "@/components/ui/search-form/search-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MenuUser(): React.ReactNode {
  const [key, setKey] = useState<string>("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`?page=1&size=10&key=${key}`, { scroll: false });
  }

  return (
    <div className="mb-4 flex items-center justify-between bg-white border rounded-2xl p-5 gap-6">
      <SearchForm
        onSearch={(e) => handleSearch(e)}
        searchKey={key}
        setKey={(e) => setKey(e)}
      />
    </div>
  );
}
