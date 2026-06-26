"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "lucide-react";
import BotaoVoltar from "@/components/botao-voltar";

export default function Dashboard() {
  const [pins, setPins] = useState([
    { id: 1, name: "Ponto de Acidente A", x: 35, y: 45 },
    { id: 2, name: "Ponto de Acidente B", x: 60, y: 25 },
  ]);

  return (
    <div className="relative w-full h-[calc(100vh-2rem)] bg-muted rounded-xl overflow-hidden border shadow-inner">
      
      <img 
        src="/seu-mapa.jpg"
        alt="Mapa de Fundo"
        className="w-full h-full object-cover select-none"
      />

      {pins.map((pin) => (
        <div
          key={pin.id}
          className="absolute text-red-600 transition-transform hover:scale-125 cursor-pointer z-10"
          style={{ top: `${pin.y}%`, left: `${pin.x}%` }}
          title={pin.name}
        >
          <MapPin className="h-8 w-8 drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] fill-red-500 text-white" />
        </div>
      ))}

      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur p-4 rounded-lg shadow-md border z-20 max-w-xs">
        <h2 className="text-sm font-semibold text-zinc-900">Painel do Mapa</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Gerencie seus pins e marcações diretamente na tela.
        </p>
      </div>

      <div className="absolute bottom-6 right-6 z-20">
        <Button className="rounded-full shadow-lg h-14 w-14 bg-[#1a2e1a] hover:bg-[#3d6b3d]">
          <Plus className="h-6 w-6 text-white" />
        </Button>
      </div>

    </div>
  );
}