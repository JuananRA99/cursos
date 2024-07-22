import { z } from "zod";

export const createCursoSchema = z.object({
  type: z.string({
    required_error: 'El tipo es requerido',
  }),
  price: z.number({
    required_error: 'El precio es requerido',
  }),
  
});

export const getCursosByUserSchema = z.object({
  userEmail: z.string().email({
    required_error: 'El correo electrónico es requerido y debe ser válido',
  }),
});