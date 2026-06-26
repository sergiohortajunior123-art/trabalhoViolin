"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin } from "lucide-react";

export default function MeusPinsPage() {
  const router = useRouter();
  
  const [pins, setPins] = useState([
    { id: "1", name: "Acidente entre carro e Tamanduá" },
    { id: "2", name: "Capivara encontrada com membro inferior fraturada" },
  ]);

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto w-full">
      {/* Cabeçalho com o Botão Voltar integrado */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar ao Mapa
        </Button>
        <h1 className="text-xl font-bold text-zinc-900">Gerenciamento</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#3d6b3d]" />
            Pins Cadastrados ({pins.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pins.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhum pin adicionado ainda.
            </p>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {pins.map((pin) => (
                <li key={pin.id} className="py-3 flex items-center justify-between group">
                  {/* Exibindo apenas o nome do Pin de forma limpa */}
                  <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900">
                    {pin.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}