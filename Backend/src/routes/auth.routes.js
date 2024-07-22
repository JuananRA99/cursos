import { Router } from "express";
import {login, register, logout, verifyToken, verifyEmail

}  from "../controllers/auth.controller.js";


import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login',  validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.post('/logout', logout);
router.get('/verify-email', verifyEmail);


export default router;