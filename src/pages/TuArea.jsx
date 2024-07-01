import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './css/TuArea.css';

function TuArea({ auth }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  return (
    <div className='tuArea'>
      <div className="container">
        <h2 className='sitio'>Tu Área</h2>
        {!auth ? (
          <>
            <Link to="/registro" className="btn btn-primary acceso">
              Registro
            </Link>
            <Link to="/login" className="btn btn-secondary acceso">
              Login
            </Link>
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </div>
  );
}

TuArea.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default TuArea;