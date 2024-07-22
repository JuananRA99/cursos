import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import  authRoutes from './routes/auth.routes.js';
import themeRoutes from './routes/theme.routes.js';
import cursoRoutes from './routes/curso.routes.js';
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Reemplaza con la URL de tu frontend en producción
    credentials: true, // Habilita el intercambio de cookies, tokens, etc. entre los orígenes
  }));

app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser());

app.use("/api", authRoutes);


app.use("/api", themeRoutes);


app.use('/api', cursoRoutes);
export default app; 
