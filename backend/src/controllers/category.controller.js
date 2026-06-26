import * as CategoryModel from "../models/category.model.js";

export async function listar(req, res) {
  const categorias = await CategoryModel.listarCategorias();
  return res.json(categorias);
}

export async function buscar(req, res) {
  const id = req.params.id;
  const categoria = await CategoryModel.buscarCategoriaPorId(id);
  if (!categoria) {
    return res.status(404).json({ error: "Categoria não encontrada." });
  }
  return res.json(categoria);
}

export async function criar(req, res) {
  const { name, species, time } = req.body;

  if (!name || !species || !time) {
    return res.status(400).json({ error: "Todos os campos (name, species, time) são obrigatórios." });
  }

  const categoria = await CategoryModel.criarCategoria({
    name,
    species,
    time,
  });
  return res.status(201).json(categoria);
}

export async function atualizar(req, res) {
  const id = req.params.id;
  const { name, species, time } = req.body;

  const categoria = await CategoryModel.buscarCategoriaPorId(id);
  if (!categoria) {
    return res.status(404).json({ error: "Categoria não encontrada." });
  }

  const atualizado = await CategoryModel.atualizarCategoria(id, {
    name,
    species,
    time,
  });
  return res.json(atualizado);
}

export async function deletar(req, res) {
  const id = req.params.id;

  const categoria = await CategoryModel.buscarCategoriaPorId(id);
  if (!categoria) {
    return res.status(404).json({ error: "Categoria não encontrada." });
  }

  await CategoryModel.deletarCategoria(id);
  return res.status(204).send();
}

const CategoryController = {
  listar,
  buscar,
  criar,
  atualizar,
  deletar
};

export default CategoryController;