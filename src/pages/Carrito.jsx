import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/Carrito.css';
import { IoCloseCircleOutline } from "react-icons/io5";
const Carrito = ({ cartItems, removeFromCart, handleCloseCart }) => {
  return (
    <div className="carrito">
      <div className="carrito-header">
        <h2>Carrito</h2>
        <button className="btn btn-dark
        close-button" onClick={handleCloseCart}>
          <IoCloseCircleOutline size={24} />
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p>No hay elementos en el carrito.</p>
      ) : (
        <ul className="list-group">
          {cartItems.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-left">
              <span>{item.type} - {item.price}€</span>
              <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <Link to="/pasarela-pago" className="btn btn-primary" onClick={handleCloseCart}>Realizar Pago</Link>
      )}
    </div>
  );
};

Carrito.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  handleCloseCart: PropTypes.func.isRequired,
};

export default Carrito;