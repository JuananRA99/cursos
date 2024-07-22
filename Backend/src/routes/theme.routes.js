import express from "express";
import {
  getThemes,
  createTheme,
  getThemeById,
  deleteTheme,
  updateTheme,
  addComment,
} from "../controllers/themes.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createThemeSchema } from "../schemas/theme.schema.js";

const router = express.Router();

router.get("/foro", authRequired, getThemes);
router.get("/foro/:id", authRequired, getThemeById); // Ruta para obtener un tema por su ID
router.post("/foro", authRequired, validateSchema(createThemeSchema), createTheme);
router.delete("/foro/:id", authRequired, deleteTheme);
router.put("/foro/:id", authRequired, updateTheme);

// Ruta para agregar un comentario a un tema específico
router.post("/foro/:id", authRequired, addComment);

export default router;