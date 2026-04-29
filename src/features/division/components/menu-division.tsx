"use client";
import Button from "@/components/ui/button/button";
import SearchForm from "@/components/ui/search-form/search-form";
import { Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormDivision } from "./form-position";

export default function MenuDivision(): React.ReactNode {
  const [key, setKey] = useState<string>("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`?page=1&size=10&key=${key}`, { scroll: false });
  }

  return (
    <div className="mb-4 flex items-center justify-between bg-white border rounded-2xl p-5 gap-6  ">
      <div className="">
        <SearchForm
          onSearch={(e) => handleSearch(e)}
          searchKey={key}
          setKey={(e) => setKey(e)}
        />
      </div>
      <div className="flex gap-3 items-center justify-center ">
        <FormDivision />
        <Link href="/employees/create">
          <Button variant="outline" prefixIcon={<Download size={18} />}>
            Download
          </Button>
        </Link>
      </div>
    </div>
  );
}
