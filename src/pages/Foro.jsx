import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './css/Foro.css';
import { BsPencilSquare } from "react-icons/bs";
const Foro = ({ temas }) => {
  return (
    <div className='forum'>
    <div className="foro-container container mt-5">
      <h2>Foro</h2>
      
      <Link to="/nuevo-tema" className="btn btn-primary  mb-4 
      "> <BsPencilSquare size={22}  className='icon-left'/>Nuevo Tema</Link>
      <div className="temas">
        <h3>Temas:</h3>
        <ul className="list-group">
          {temas.map((tema) => (
            <li key={tema.id} className="list-group-item">
              <Link to={`/foro/${tema.id}`}>{tema.titulo}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

Foro.propTypes = {
  temas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      titulo: PropTypes.string.isRequired,
      texto: PropTypes.string.isRequired,
      comentarios: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired
};

export default Foro;