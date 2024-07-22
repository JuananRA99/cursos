import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useThemes } from "../context/themesContext";
import './css/NuevoTema.css';



const NuevoTema = ({ userEmail }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { createTheme } = useThemes();
  const navigate = useNavigate();

  const agregarTema = async (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      try {
        await createTheme({
          title,
          description,
          date: new Date().toISOString(), // Añadir la fecha actual
          email: userEmail // Aunque no se usa en el backend, se puede incluir si es necesario
        });
        navigate('/foro');
      } catch (error) {
        console.error('Error creating theme:', error);
      }
    }
  };

  return (
    <div className='temita'>
      <div className="nuevo-tema-container container mt-5">
        <h2>Nuevo Tema</h2>
        <form onSubmit={agregarTema} className="mt-4">
          <div className="form-group">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <textarea
              className="form-control"
              id="description"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary mt-2">Agregar Tema</button>
        </form>
      </div>
    </div>
  );
};


NuevoTema.propTypes = {
  temas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      titulo: PropTypes.string.isRequired,
      texto: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      comentarios: PropTypes.arrayOf(
        PropTypes.shape({
          email: PropTypes.string.isRequired,
          comentario: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  setTemas: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired
};

export default NuevoTema;