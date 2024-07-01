import React from 'react';
import PropTypes from 'prop-types';
import './css/CursosVenta.css';

const CursosVenta = ({ addToCart }) => {
  const handleReservePiano = () => {
    addToCart({ type: 'Clases de Piano', price: 60 });
  };

  const handleBuyInformatica = () => {
    addToCart({ type: 'Clases de Informática', price: 50 });
  };

  const handleBuyIngles = () => {
    addToCart({ type: 'Clases de Inglés', price: 70 });
  };

  const cursos = [
    { id: 1, nombre: 'Clases de Piano', precio: 60, descripcion: 'Aprende a tocar el piano con nuestras clases en línea.', handleAction: handleReservePiano },
    { id: 2, nombre: 'Clases de Informática', precio: 50, descripcion: 'Mejora tus habilidades en informática con nuestros cursos.', handleAction: handleBuyInformatica },
    { id: 3, nombre: 'Clases de Inglés', precio: 70, descripcion: 'Domina el inglés con nuestras clases interactivas.', handleAction: handleBuyIngles },
  ];

  return (
    <div className='cursos-venta' >
    <div className="container mt-5">
      <h2>Cursos en Venta</h2>
      <div className="row">
        {cursos.map((curso) => (
          <div key={curso.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{curso.nombre}</h5>
                <p className="card-text">{curso.descripcion}</p>
                <p className="card-text">Precio: {curso.precio}€</p>
                <button 
                  className="btn btn-primary"
                  onClick={curso.handleAction}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

CursosVenta.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default CursosVenta;