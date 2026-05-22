"use client";
import SearchForm from "@/components/ui/search-form/search-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormRole } from "./form-role";

export default function MenuRole(): React.ReactNode {
  const [key, setKey] = useState<string>("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`?page=1&size=10&key=${key}`, { scroll: false });
  }

  return (
    <div className="mb-4 flex items-center justify-between bg-white border rounded-2xl p-5 gap-6">
      <div>
        <SearchForm
          onSearch={(e) => handleSearch(e)}
          searchKey={key}
          setKey={(e) => setKey(e)}
        />
      </div>
      <div className="flex gap-3 items-center">
        <FormRole />
      </div>
    </div>
  );
}
