import  { createContext, useContext, useState } from 'react';
import { addCursosRequest, getCursosByUserRequest } from '../api/cursos'; // Asegúrate de importar correctamente

const CursosContext = createContext();

export const useCursos = () => {
  return useContext(CursosContext);
};

export const CursosProvider = ({ children }) => {
  const [cursos, setCursos] = useState([]);

  // Función para añadir un curso
  const addCurso = async (cursoData) => {
    try {
      const response = await addCursosRequest(cursoData);
      setCursos((prevCursos) => [...prevCursos, response.data]);
    } catch (error) {
      console.error('Error al crear curso:', error.response?.data || error.message);
      throw error; // Re-lanzar el error para manejarlo en el componente
    }
  };

  // Función para obtener cursos por usuario
  const getCursosByUser = async (userId) => {
    try {
      const response = await getCursosByUserRequest(userId);
      setCursos(response.data);
    } catch (error) {
      console.error('Error al obtener cursos:', error.response?.data || error.message);
      throw error; // Re-lanzar el error para manejarlo en el componente
    }
  };

  return (
    <CursosContext.Provider value={{ cursos, addCurso, getCursosByUser }}>
      {children}
    </CursosContext.Provider>
  );
};