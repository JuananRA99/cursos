import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useThemes } from '../context/themesContext';
import './css/Tema.css';
import PropTypes from 'prop-types';

const EditarTema = ({ userEmail }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getThemeById, updateTheme } = useThemes();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const fetchedTheme = await getThemeById(id);
        setTitle(fetchedTheme.title || "");
        setDescription(fetchedTheme.description || "");
      } catch (err) {
        setError('Error fetching theme');
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, [id, getThemeById]);

  const handleUpdate = async () => {
    try {
      await updateTheme(id, { title, description });
      navigate(`/foro/${id}`);
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="theme">
      <div className="tema-container container  mt-5">
        <h3 className='editar-tema'>Editar Tema</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>

          <div className="form-group ">
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
          <div className="form-group mt-3">
            <label htmlFor="description">Descripción:</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

EditarTema.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default EditarTema;