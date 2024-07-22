import express from "express";
import {

  getCursosByUser,
  addCursos
} from "../controllers/curso.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {  createCursoSchema } from "../schemas/curso.schema.js";

const router = express.Router();

router.post('/cursos', authRequired, validateSchema(createCursoSchema), addCursos);
router.get('/cursos/:id', authRequired, getCursosByUser);
export default router;