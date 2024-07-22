import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GoogleCalendarButton from '../components/BtnGoogleCalendar';
import { useCursos } from '../context/CursosContext';
import { useAuth } from '../context/AuthContext';
import './css/CursosComprados.css';

const CursosComprados = ({ setRedirectPath }) => {
  const { cursos, getCursosByUser } = useCursos();
  const { isAuthenticated, user } = useAuth();
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      getCursosByUser(user.id);
    }
  }, [isAuthenticated, user, getCursosByUser]);

  const handleReservarClick = (index) => {
    setSelectedCourseIndex(index === selectedCourseIndex ? null : index);
  };

  if (!isAuthenticated) {
    return (
      <div className='cursos-comprados'>
        <div className="cursos-reservados container mt-5">
          <h2>Cursos Comprados</h2>
          <p>Para ver tus cursos comprados, primero debes iniciar sesión.</p>
          <Link to="/login" className="btn btn-secondary mr-2" onClick={() => setRedirectPath('/cursos-comprados')}>Iniciar Sesión</Link>
          <Link to="/registro" className="btn btn-primary" onClick={() => setRedirectPath('/cursos-comprados')}>Registrarse</Link>
        </div>
      </div>
    );
  }

  return (
    <div className='cursos-comprados'>
      <div className="cursos-reservados container mt-5">
        <h2>Cursos Comprados</h2>
        {cursos.length === 0 ? (
          <p>No has comprado ningún curso todavía.</p>
        ) : (
          <ul className="list-group">
            {cursos.map((curso, index) => (
              <li key={index} className="list-group-item reservas">
                <div className="curso-info">
                  {curso.type}: {curso.price}€
                </div>
                <button
                  className="btn btn-primary reservar-btn"
                  onClick={() => handleReservarClick(index)}
                >
                  Reservar
                </button>
                {selectedCourseIndex === index && (
                  <GoogleCalendarButton containerId={`google-calendar-button-${index}`} />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

CursosComprados.propTypes = {
  setRedirectPath: PropTypes.func.isRequired,
};

export default CursosComprados;
