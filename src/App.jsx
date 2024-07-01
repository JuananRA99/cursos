import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import TuArea from './pages/TuArea';
import Cursos from './pages/Cursos';
import CursosVenta from './pages/CursosVenta';
import CursosComprados from './pages/CursosComprados';
import Foro from './pages/Foro';
import Tema from './pages/Tema';
import NuevoTema from './pages/NuevoTema';
import Login from './pages/Login';
import Registro from './pages/Registro';
import PasarelaPago from './pages/PasarelaPago';
import './index.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [redirectPath, setRedirectPath] = useState('/');
  const [temas, setTemas] = useState([]);

  const handleLogin = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
  };

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div>
      <Router>
        <NavBar
          auth={isAuthenticated}
          userEmail={userEmail}
          cartItems={cartItems}
          toggleCart={() => setIsCartOpen(!isCartOpen)}
          isCartOpen={isCartOpen}
          handleLogout={handleLogout}
          removeFromCart={removeFromCart}
          handleCloseCart={handleCloseCart}
        />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/tu-area" element={<TuArea auth={isAuthenticated} />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/cursos-venta" element={<CursosVenta addToCart={addToCart} />} />
          <Route path="/cursos-comprados" element={<CursosComprados />} />
          <Route path="/foro" element={<Foro temas={temas} setTemas={setTemas} />} />
          <Route path="/foro/:id" element={<Tema temas={temas} setTemas={setTemas} />} />
          <Route path="/nuevo-tema" element={<NuevoTema temas={temas} setTemas={setTemas} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} setRedirectPath={setRedirectPath} />} />
          <Route
            path="/registro"
            element={<Registro setAuth={handleLogin} redirectPath={redirectPath} setRedirectPath={setRedirectPath} />}
          />
          <Route
            path="/pasarela-pago"
            element={<PasarelaPago cartItems={cartItems} isAuthenticated={isAuthenticated} setRedirectPath={setRedirectPath} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;