"use client";
import Button from "@/components/ui/button/button";
import SearchForm from "@/components/ui/search-form/search-form";
import { Download, File, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImportEmployee from "./import-employee";

export default function MenuEmployee(): React.ReactNode {
  const [key, setKey] = useState<string>("");
  const [isImportOpen, setIsImportOpen] = useState(false);
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`?page=1&size=10&key=${key}`, { scroll: false });
  }

  return (
    <>
      <ImportEmployee isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} />
      <div className="mb-4 flex items-center justify-between bg-white border rounded-2xl p-5 gap-6">
        <div className="">
          <SearchForm
            onSearch={(e) => handleSearch(e)}
            searchKey={key}
            setKey={(e) => setKey(e)}
          />
        </div>
        <div className="mt-3 flex gap-3">
          <Link href="/employees/create">
            <Button variant="secondary" prefixIcon={<PlusCircle size={18} />}>
              Tambah
            </Button>
          </Link>
          <Button
            variant="outline"
            prefixIcon={<File size={18} />}
            onClick={() => setIsImportOpen(true)}
          >
            Import data
          </Button>
          <Link href="/employees/create">
            <Button variant="outline" prefixIcon={<Download size={18} />}>
              Download
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
