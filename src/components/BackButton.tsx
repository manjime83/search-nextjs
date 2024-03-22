"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} className="flex items-center gap-2 pb-2 text-sm" variant="secondary">
      <ChevronLeft className="size-4" /> Back
    </Button>
  );
}
