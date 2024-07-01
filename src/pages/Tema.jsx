import PropTypes from 'prop-types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/Tema.css';

const Tema = ({ temas, setTemas }) => {
  const { id } = useParams();
  const tema = temas.find((t) => t.id === parseInt(id));
  const [nuevoComentario, setNuevoComentario] = useState('');

  const agregarComentario = (e) => {
    e.preventDefault();
    if (nuevoComentario.trim()) {
      const updatedTemas = temas.map((t) =>
        t.id === tema.id
          ? { ...t, comentarios: [...t.comentarios, nuevoComentario] }
          : t
      );
      setTemas(updatedTemas);
      setNuevoComentario('');
    }
  };

  if (!tema) {
    return <div className="container mt-5">Tema no encontrado.</div>;
  }

  return (
    <div className='theme'>
    <div className="tema-container container mt-5">
      <h2>{tema.titulo}</h2>
      <hr />
      <p>{tema.texto}</p>
      <div className="comentarios mt-4">
        <h3>Comentarios:</h3>
        <ul className="list-group">
          {tema.comentarios.map((comentario, index) => (
            <li key={index} className="list-group-item">
              {comentario}
            </li>
          ))}
        </ul>
      </div>
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
        <button type="submit" className="btn btn-primary mt-2">Agregar Comentario</button>
      </form>
    </div>
    </div>
  );
};

Tema.propTypes = {
  temas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      titulo: PropTypes.string.isRequired,
      texto: PropTypes.string.isRequired,
      comentarios: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired,
  setTemas: PropTypes.func.isRequired,
};

export default Tema;