// Tema.jsx (fragmento relevante)
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useThemes } from '../context/themesContext';
import './css/Tema.css';
import PropTypes from 'prop-types';

const Tema = ({ userEmail }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getThemeById, updateTheme, deleteTheme, addComment } = useThemes();
  const [tema, setTema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [nuevoComentario, setNuevoComentario] = useState("");

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const fetchedTheme = await getThemeById(id);
        setTema(fetchedTheme);
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
    if (tema) {
      const updatedTheme = {
        ...tema,
        title,
        description,
      };
      await updateTheme(tema._id, updatedTheme);
      setTema(updatedTheme);
    }
  };

  const handleDelete = async () => {
    if (tema) {
      await deleteTheme(tema._id);
      navigate('/foro');
    }
  };

  const agregarComentario = async (e) => {
    e.preventDefault();
    if (tema && nuevoComentario.trim()) {
      const comment = {
        email: userEmail,
        comentario: nuevoComentario,
      };
      await addComment(tema._id, comment);
      setNuevoComentario("");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!tema) return <p>No theme found</p>;

  return (
    <div className="theme">
      <div className="tema-container container mt-5">
        <div className="tema-header">
          <p><strong>Autor:</strong> {tema.user.email} | <strong>Fecha:</strong> {new Date(tema.date).toLocaleString()}</p>
        </div>
        <div className="tema-details">
          <h3>{tema.title}</h3>
          <p>{tema.description}</p>
        </div>

        <hr />

        <form onSubmit={agregarComentario} className="mt-4">
          <div className="form-group">
            <label htmlFor="nuevoComentario">Nuevo comentario:</label>
            <input
              type="text"
              className="form-control"
              id="nuevoComentario"
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Agregar Comentario
          </button>
        </form>

        <div className="comentarios mt-4">
          <h3>Comentarios:</h3>
          {tema.comentarios && tema.comentarios.length > 0 ? (
            <ul className="list-group">
              {tema.comentarios.map((comentario, index) => (
                <li key={index} className="list-group-item">
                  <strong>{comentario.email}:</strong> {comentario.comentario}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay comentarios aún.</p>
          )}
        </div>

       
      </div>
    </div>
  );
};

Tema.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default Tema;
