"use client";
import Button from "@/components/ui/button/button";
import SearchForm from "@/components/ui/search-form/search-form";
import { Download, File, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MenuEmployee(): React.ReactNode {
  const [key, setKey] = useState<string>("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`?page=1&size=10&key=${key}`, { scroll: false });
  }

  return (
    <div className="mb-4 bg-white border rounded-2xl p-5 ">
      <SearchForm
        onSearch={(e) => handleSearch(e)}
        searchKey={key}
        setKey={(e) => setKey(e)}
      />
      <div className="mt-3 flex gap-3 ">
        <Link href="/employees/create">
          <Button variant="secondary" prefixIcon={<PlusCircle size={18} />}>
            Tambah karyawan
          </Button>
        </Link>
        <Link href="/employees/create">
          <Button variant="secondary" prefixIcon={<File size={18} />}>
            Import data
          </Button>
        </Link>
        <Link href="/employees/create">
          <Button variant="secondary" prefixIcon={<Download size={18} />}>
            Download
          </Button>
        </Link>
      </div>
    </div>
  );
}
