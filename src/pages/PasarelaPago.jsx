import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from '@stripe/stripe-js';
import { FaStripeS, FaPaypal } from "react-icons/fa";
import './css/PasarelaPago.css';
import { useCursos } from '../context/CursosContext';
import { useAuth } from '../context/AuthContext';

const stripePromise = loadStripe('pk_live_51POzt0K0UIR7o4cQthG1seVhDDLSsPOP23FIS90i1xMyFjYBV2XjhhireAAQ3OWZQ5P77pRuQW2F5R30FVZleEj900jAj4Wrp7');

const PasarelaPago = ({ cartItems, isAuthenticated, setRedirectPath }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [total, setTotal] = useState(0);
  const [showStripeButton, setShowStripeButton] = useState(false);
  const [showPayPalButtons, setShowPayPalButtons] = useState(false);
  const { addCurso } = useCursos();
  const {  user } = useAuth();

  useEffect(() => {
    const totalSum = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalSum);
  }, [cartItems]);

  const handlePayment = async () => {
    if (!user) return;

    try {
      await Promise.all(cartItems.map(item => 
        addCurso({
          type: item.type,
          price: item.price,
      user: user.id
        })
      ));
      alert('Cursos añadidos exitosamente.');
    } catch (error) {
      console.error('Error al crear cursos:', error);
      alert('Hubo un error al añadir los cursos.');
    }
  };
  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    if (method === 'PayPal') {
      setShowPayPalButtons(false);
      setShowStripeButton(false);
    } else if (method === 'Stripe') {
      setShowStripeButton(true);
      setShowPayPalButtons(false);
    }
  };

  const handlePayPalButton = () => {
    if (!isAuthenticated) {
      alert('Para hacer el pago, primero debes iniciar sesión o registrarte.');
      setRedirectPath('/pasarela-pago');
      return;
    }
    handlePayment(); // Llama a handlePayment inmediatamente
    setShowPayPalButtons(true);
  };

  const handleStripePayment = async () => {
    if (!isAuthenticated) {
      alert('Para hacer el pago, primero debes iniciar sesión o registrarte.');
      setRedirectPath('/pasarela-pago');
      return;
    }

    const stripe = await stripePromise;

    const response = await fetch('http://localhost:4242/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems.map((item) => ({
          name: item.type,
          price: item.price,
          quantity: 1,
        })),
      }),
    });

    if (!response.ok) {
      console.error('Error en la creación de la sesión de pago:', response.statusText);
      alert('Hubo un error al crear la sesión de pago. Intenta nuevamente.');
      return;
    }

    const session = await response.json();
    handlePayment(); // Llama a handlePayment inmediatamente
    stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="pasarela">
      <div className="container mt-5">
        <h2>Pasarela de Pago</h2>
        <p>Productos en el carrito:</p>
        <ul className='tipo-consulta'>
          {cartItems.map((item, index) => (
            <li key={index}>{item.type}: {item.price}€</li>
          ))}
        </ul>
        <h3>Total: {total}€</h3>
        {isAuthenticated ? (
          <div>
            <h3 className='metodo-pago'>Selecciona un método de pago:</h3>
            <div className="mb-4">
              <button className="btn btn-primary btn-pay" onClick={() => handleSelectMethod('Stripe')}><FaStripeS size={25} /></button>
              <button className="btn btn-primary btn-pay" onClick={() => handleSelectMethod('PayPal')}><FaPaypal size={25} /></button>
            </div>
            {selectedMethod === 'PayPal' && !showPayPalButtons && (
              <button className="btn btn-success mt-3" onClick={handlePayPalButton}>Pagar con PayPal</button>
            )}
            {showPayPalButtons && (
              <div>
                <PayPalScriptProvider options={{ "client-id": "AVMw2wMrB26RrMBGFpIiHUqA1lB8BwvcUFQlX920I7rXyuJU9ndzXorXwKtYfpNR3tkm0HfNhqC-A5hA", currency: "EUR" }}>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{
                          amount: {
                            value: total.toFixed(2),
                            currency_code: 'EUR'
                          }
                        }]
                      });
                    }}
                    onApprove={async (data, actions) => {
                      try {
                        const order = await actions.order.capture();
                        console.log("Order", order);
                        alert(`Transacción completada por ${order.payer.name.given_name}`);
                        handlePayment(); // Llama a handlePayment aquí
                      } catch (error) {
                        console.error("Error al capturar el pedido", error);
                        alert('Hubo un error al procesar el pago con PayPal.');
                      }
                    }}
                    onError={(err) => {
                      console.error(err);
                      alert('Hubo un error al procesar el pago con PayPal.');
                    }}
                    style={{
                      layout: 'vertical',
                      color: 'blue',
                      shape: 'rect',
                      label: 'paypal',
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}
            {showStripeButton && (
              <button className="btn btn-success mt-3" onClick={handleStripePayment}>Pagar con Stripe</button>
            )}
          </div>
        ) : (
          <div>
            <p className='pago'>Para hacer el pago, primero debes iniciar sesión o registrarte.</p>
            <Link to="/login" className="btn btn-secondary boton" onClick={() => setRedirectPath('/pasarela-pago')}>Login</Link>
            <Link to="/registro" className="btn btn-primary mr-5 boton" onClick={() => setRedirectPath('/pasarela-pago')}>Registro</Link>
          </div>
        )}
      </div>
    </div>
  );
};

PasarelaPago.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setRedirectPath: PropTypes.func.isRequired,
};

export default PasarelaPago;
