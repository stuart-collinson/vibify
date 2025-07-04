"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "vib/components/ui/button";

export const BackButton = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/dashboard");
  };

  return (
    <Button
      onClick={handleBackClick}
      className="bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600"
      size="sm"
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
}; 