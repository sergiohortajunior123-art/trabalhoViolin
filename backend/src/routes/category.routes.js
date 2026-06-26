import { Router } from "express";
import CategoryController from "../controllers/category.controller.js";
import { authMiddleware } from "./protectedRoutes.js";

const router = Router();

router.use(authMiddleware);
router.post("/", CategoryController.criar);
router.get("/", CategoryController.listar);
router.get("/:id", CategoryController.buscar);
router.put("/:id", CategoryController.atualizar);
router.delete("/:id", CategoryController.deletar);

export default router;