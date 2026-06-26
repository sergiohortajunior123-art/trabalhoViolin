import { prisma } from "../lib/prisma.js";

export async function listarCategorias() {
    return prisma.category.findMany({ orderBy: { createdAt: "desc" } });
}

export async function buscarCategoriaPorId(id) {
    return prisma.category.findUnique({ where: { id } });
}

export async function criarCategoria(data) {
    return prisma.category.create({ data });
}

export async function atualizarCategoria(id, data) {
    return prisma.category.update({ where: { id }, data });
}

export async function deletarCategoria(id) {
    return prisma.category.delete({ where: { id } });
}