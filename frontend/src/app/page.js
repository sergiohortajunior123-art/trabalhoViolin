"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 gap-4">
      <Button onClick={() => router.push("/login")}>Login</Button>
      <Button onClick={() => router.push("/registro")}>Registrar</Button>
    </main>
  );
}