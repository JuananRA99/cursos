import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/NuevoTema.css';

const NuevoTema = ({ temas, setTemas }) => {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const navigate = useNavigate();

  const agregarTema = (e) => {
    e.preventDefault();
    if (titulo.trim() && texto.trim()) {
      setTemas([...temas, { id: temas.length + 1, titulo, texto, comentarios: [] }]);
      setTitulo('');
      setTexto('');
      navigate('/foro');
    }
  };

  return (
    <div className='temita'>
    <div className="nuevo-tema-container container mt-5">
      <h2>Nuevo Tema</h2>
      <form onSubmit={agregarTema}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="texto">Mensaje:</label>
          <textarea
            className="form-control"
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Enviar Nuevo Tema</button>
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
      comentarios: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired,
  setTemas: PropTypes.func.isRequired,
};

export default NuevoTema;