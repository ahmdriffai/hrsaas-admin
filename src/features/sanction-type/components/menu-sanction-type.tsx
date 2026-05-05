"use client";

import Button from "@/components/ui/button/button";
import SearchForm from "@/components/ui/search-form/search-form";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateSanctionTypeForm } from "./create-sanction-type";

export default function MenuSanctionType(): React.ReactNode {
  const [key, setKey] = useState<string>("");
  const router = useRouter();


  return (
    <div className="mb-4 flex items-center justify-between bg-white border rounded-2xl p-5 gap-6">
      <div>
        <SearchForm
          onSearch={(e) => {
            e.preventDefault();
            router.push(`?page=1&size=10&key=${key}`, { scroll: false });
          }}
          searchKey={key}
          setKey={(e) => setKey(e)}
        />
      </div>
      <div className="flex gap-3 items-center justify-center">
        <CreateSanctionTypeForm />
        <Button variant="outline" prefixIcon={<Download size={18} />}>
          Download
        </Button>
      </div>
    </div>
  );
}
