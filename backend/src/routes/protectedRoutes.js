import express from "express";
import auth from "../lib/auth.js";

const router = express.Router();

router.get(
  "/protected",
  auth.handler,
  (req, res) => {
    res.json({
      message: "Rota protegida funcionando ",
    });
  }
);

export default router;