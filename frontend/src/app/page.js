"use client"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#3d6b3d]">
      <div className="max-w-2xl text-center px-8">
        <h1 className="text-5xl font-extrabold text-[#a8c5a0] mb-6">
          Mapa Interativo
        </h1>
        <p className="text-lg text-[#a8c5a0] mb-4">
          Explore locais de acidente no mapa.
        </p>
        <p className="text-md text-[#a8c5a0] opacity-75">
          Faça login ou cadastre-se para começar a adicionar seus pins.
        </p>
      </div>
    </main>
  );
}