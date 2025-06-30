"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginPage } from "vib/components/login";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) router.push("/dashboard");
  }, [session, status, router]);

  if (status === "unauthenticated") return <LoginPage />;
  return null;
}
