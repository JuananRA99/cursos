import axios from "./axios.js";

// Obtener cursos
export const getCursosByUserRequest = (id) => axios.get(`/cursos/${id}`);

// Crear un curso nuevo
export const addCursosRequest = (curso) => axios.post("/cursos", curso);