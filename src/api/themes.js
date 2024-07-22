import axios from "./axios.js";

export const getThemesRequest = () => axios.get("/foro");

export const getThemeByIdRequest = (id) => axios.get(`/foro/${id}`);

export const createThemeRequest = (theme) => axios.post("/foro", theme);

export const updateThemeRequest = (id, theme) => axios.put(`/foro/${id}`, theme);

export const deleteThemeRequest = (id) => axios.delete(`/foro/${id}`);

// Nueva función para agregar comentario a un tema específico

export const addCommentRequest = (id, comment) => axios.post(`/foro/${id}`, comment);