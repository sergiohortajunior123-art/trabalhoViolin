"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Plus, Pencil, Trash2 } from "lucide-react";

// 🟢 Atualizado para a nova rota do backend
const API_URL = "http://localhost:3001/api/categories";

// 🟢 Atualizado com os novos campos da regra de negócios
const camposVazios = { name: "", species: "", time: "" };

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [sheetAberta, setSheetAberta] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [form, setForm] = useState(camposVazios);

  // ── Buscar todas as categorias ──────────────────────────────────────────────
  async function buscarCategorias() {
    setLoading(true);
    setErro(""); 
    try {
      const res = await fetch(API_URL, { credentials: "include" });
      const data = await res.json();
      setCategorias(data);
    } catch {
      setErro("Erro ao carregar categorias.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, []);

  // ── Abrir sheet para criar ──────────────────────────────────────────────────
  function abrirCriacao() {
    setCategoriaEditando(null);
    setForm(camposVazios);
    setErro(""); 
    setSheetAberta(true);
  }

  // ── Abrir sheet para editar ─────────────────────────────────────────────────
  function abrirEdicao(categoria) {
    setCategoriaEditando(categoria);
    setErro("");
    setForm({
      name: categoria.name,
      species: categoria.species,
      time: categoria.time,
    });
    setSheetAberta(true);
  }

  // ── Salvar (criar ou atualizar) ─────────────────────────────────────────────
  async function handleSalvar() {
    setErro("");

    const body = {
      name: form.name,
      species: form.species,
      time: form.time,
    };

    const url = categoriaEditando ? `${API_URL}/${categoriaEditando.id}` : API_URL;
    const method = categoriaEditando ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error();
      setSheetAberta(false);
      buscarCategorias();
    } catch {
      setErro("Erro ao salvar categoria.");
    }
  }

  // ── Deletar ─────────────────────────────────────────────────────────────────
  async function handleDeletar(id) {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;

    setErro("");

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error();
      buscarCategorias();
    } catch {
      setErro("Erro ao excluir categoria.");
    }
  }

  return (
    <div className="flex flex-col gap-6 p-2">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2e1a]">Categorias</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie os tipos de acidentes e ocorrências registradas no mapa.
          </p>
        </div>

        <Button
          onClick={abrirCriacao}
          className="bg-[#1a2e1a] hover:bg-[#3d6b3d] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Categoria
        </Button>
      </div>

      <Separator />

      {/* Mensagem de erro */}
      {erro && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-md px-4 py-2">
          {erro}
        </p>
      )}

      {/* Lista de categorias */}
      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando categorias...</p>
      ) : categorias.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma categoria cadastrada ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categorias.map((categoria) => (
            <Card key={categoria.id} className="p-5 flex flex-col gap-3 border shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#3d6b3d]">
                  {categoria.time}
                </span>
                <h2 className="text-lg font-bold text-[#1a2e1a]">{categoria.name}</h2>
              </div>

              <Separator />

              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <span>Espécie encontrada: <strong className="text-zinc-700">{categoria.species}</strong></span>
              </div>

              <div className="flex gap-2 mt-auto pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-[#1a2e1a] border-[#a8c5a0] hover:bg-[#f0f7f0]"
                  onClick={() => abrirEdicao(categoria)}
                >
                  <Pencil className="h-3.5 w-3.5 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => handleDeletar(categoria.id)}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Excluir
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Sheet de criação/edição */}
      <Sheet open={sheetAberta} onOpenChange={setSheetAberta}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-[#1a2e1a]">
              {categoriaEditando ? "Editar Categoria" : "Nova Categoria"}
            </SheetTitle>
            <SheetDescription className="hidden">
              Preencha os campos abaixo para salvar a ocorrência.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-5 mt-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Tipo de Acidente / Ocorrência</Label>
              <Input
                id="name"
                placeholder="Ex: Atropelamento, Avistamento"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="species">Espécie do Animal</Label>
              <Input
                id="species"
                placeholder="Ex: Capivara, Tamanduá-bandeira"
                value={form.species}
                onChange={(e) => setForm({ ...form, species: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="time">Horário (Fictício ou Real)</Label>
              <Input
                id="time"
                placeholder="Ex: 14:30, Noite, Madrugada"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </div>

            <Button
              onClick={handleSalvar}
              className="mt-2 bg-[#1a2e1a] hover:bg-[#3d6b3d] text-white"
            >
              {categoriaEditando ? "Salvar Alterações" : "Criar Categoria"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

    </div>
  );
}