import  { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación
import { useThemes } from "../context/themesContext";
import './css/Foro.css';
import PropTypes from 'prop-types';

const Foro = ({ setRedirectPath }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth(); // Obtén el estado de autenticación y el usuario actual
  const { themes, getThemes, deleteTheme } = useThemes();

  useEffect(() => {
    getThemes();
  }, [getThemes]);

  const handleNewThemeClick = () => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para publicar un nuevo tema.');
      setRedirectPath('/nuevo-tema');
      navigate('/login');
    } else {
      navigate('/nuevo-tema');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTheme(id);
      await getThemes();
    } catch (error) {
      console.error('Error deleting theme:', error);
    }
  };

  return (
    <div className="forum">
      <div className="foro-container container mt-5">
        <h2>Foro</h2>
        <button onClick={handleNewThemeClick} className="btn btn-primary pencil mb-4">
          <BsPencilSquare size={22} className="icon-left" /> Nuevo Tema
        </button>
        <div className="temas">
          <h3>Temas:</h3>
          {themes.length > 0 ? (
            <ul className="list-group">
              {themes.map((theme) => (
                <li key={theme._id} className="list-group-item">
                  <Link to={`/foro/${theme._id}`}>{theme.title}</Link>
                  {isAuthenticated && theme.user.email === user.email && ( // Comparar con el usuario actual
                    <div className="ml-2">
                      <Link to={`/editar-tema/${theme._id}`} className="btn btn-sm btn-primary mr-2 mb-5">Actualizar</Link>
                      <button className="btn btn-sm btn-danger mb-5" onClick={() => handleDelete(theme._id)}>Eliminar</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay temas disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

Foro.propTypes = {
  setRedirectPath: PropTypes.func.isRequired
}

export default Foro;