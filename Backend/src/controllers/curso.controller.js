import Curso from '../models/curso.model.js';

export const getCursosByUser = async (req, res) => {
    try {
      const cursos = await Curso.find({ user : req.user.id }).populate("user");
      res.json(cursos);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  export const addCursos = async (req, res) => {
    const { type, price, user } = req.body;
  
    // Validar campos requeridos
    if (!type || !price || !user) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
  
    try {
      const nuevoCurso = new Curso({ type, price, user });
      await nuevoCurso.save();
      res.status(201).json(nuevoCurso);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el curso' });
    }
  };