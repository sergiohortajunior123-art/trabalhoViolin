"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">Login</h1>
      <Button onClick={() => router.push("/registro")}>Não tenho conta</Button>
      <Button onClick={() => router.push("/")}>Voltar</Button>
    </main>
  );
}