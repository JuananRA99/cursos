import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Carrito from '../pages/Carrito';
import { GrCart } from 'react-icons/gr';
import { useState } from 'react';
import '../index.css';

const NavBar = ({ auth, userEmail, cartItems, toggleCart, isCartOpen, handleLogout, removeFromCart, handleCloseCart }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/">Tus Cursos</Link>
      <button className="navbar-toggler" type="button" onClick={toggleNav}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tu-area">Tu Área</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cursos">Cursos</Link>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={toggleCart}>
              <GrCart size={28} /> ({cartItems.length})
            </button>
            {isCartOpen && (
              <div className="cart-dropdown">
                <Carrito cartItems={cartItems} removeFromCart={removeFromCart} handleCloseCart={handleCloseCart} />
              </div>
            )}
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/foro">Comunidad</Link> {/* Actualizado */}
          </li>
          {auth && (
            <div className='nav-login'>
              <li className="nav-item">
                <span className="nav-link"> {userEmail}</span>
              </li>
              <li className="nav-item">
                <Link className="btn btn-danger salir" to="/" onClick={handleLogout}>Salir</Link>
              </li>
              
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  auth: PropTypes.bool.isRequired,
  userEmail: PropTypes.string,
  cartItems: PropTypes.array.isRequired,
  toggleCart: PropTypes.func.isRequired,
  isCartOpen: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  handleCloseCart: PropTypes.func.isRequired,
};

export default NavBar;