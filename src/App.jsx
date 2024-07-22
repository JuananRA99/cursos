import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import TuArea from './pages/TuArea';
import Cursos from './pages/Cursos';
import CursosVenta from './pages/CursosVenta';
import CursosComprados from './pages/CursosComprados';
import Foro from './pages/Foro';
import EditarTema from './pages/EditarTema';
import Tema from './pages/Tema';
import NuevoTema from './pages/NuevoTema';
import Login from './pages/Login';
import Registro from './pages/Registro';
import PasarelaPago from './pages/PasarelaPago';

import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemesProvider } from "./context/themesContext";
import { CursosProvider } from './context/CursosContext';
import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <ThemesProvider>
        <CursosProvider>
          <AppContent />
        </CursosProvider>
      </ThemesProvider>
    </AuthProvider>
  );
};

const AppContent = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [redirectPath, setRedirectPath] = React.useState('/');
  const [cartItems, setCartItems] = React.useState([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [cursosUsuario, setCursosUsuario] = React.useState([]);

  const handleLogout = () => {
    logout();
  };

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
          userEmail={user ? user.email : ''}
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
          <Route
            path="/cursos-comprados"
            element={<CursosComprados cursosUsuario={cursosUsuario} isAuthenticated={isAuthenticated} setRedirectPath={setRedirectPath} />}
          />
          <Route path="/foro" element={<Foro isAuthenticated={isAuthenticated} userEmail={user ? user.email : ""} setRedirectPath={setRedirectPath} />} />
          <Route path="/editar-tema/:id" element={<EditarTema />} />
          <Route path="/foro/:id" element={<Tema userEmail={user ? user.email : ""} />} />
          <Route
            path="/nuevo-tema"
            element={<NuevoTema userEmail={user ? user.email : ""} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/pasarela-pago"
            element={<PasarelaPago    userEmail={user ? user.email : ""} cartItems={cartItems} isAuthenticated={isAuthenticated} setRedirectPath={setRedirectPath} />}
          />

        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
