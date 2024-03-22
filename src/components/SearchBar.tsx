"use client";

import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearching, startTransition] = useTransition();
  const router = useRouter();

  const search = () => {
    startTransition(() => {
      router.push(`/search?query=${query}`);
    });
  };

  return (
    <div className="relative flex flex-col w-full bg-white h-14">
      <div className="relative z-10 rounded-md h-14">
        <Input
          ref={inputRef}
          disabled={isSearching}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search();
            } else if (e.key === "Escape") {
              inputRef?.current?.blur();
            }
          }}
          className="inset-0 h-full absoule"
        />
        <Button
          onClick={search}
          className="absolute inset-y-0 right-0 h-full rounded-l-none"
          size="sm"
          disabled={isSearching}
        >
          {isSearching ? <Loader2 className="size-6 animate-spin" /> : <Search className="size-6" />}
        </Button>
      </div>
    </div>
  );
}
