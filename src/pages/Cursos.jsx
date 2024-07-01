import { Link } from 'react-router-dom';
import './css/Cursos.css';

const Cursos = () => {
  return (
    <div className='cursos'>
    <div className="container mt-5">
      <h2>Explora Nuestros Cursos</h2>
      <div className="btn-group mr-5 mt-5">
        <Link to="/cursos-venta" className="btn btn-primary">
          Cursos en Venta
        </Link>
        <Link to="/cursos-comprados" className="btn btn-success">
          Cursos Comprados
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Cursos;