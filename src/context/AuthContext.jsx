import { useEffect, createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest, verifyEmailRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(false);
      setSuccessMessage("Registro exitoso. Por favor verifica tu correo electrónico.");
      setTimeout(() => {
        setSuccessMessage(""); // Limpia el mensaje después de redirigir
      }, 2000);
    } catch (error) {
      setErrors(error.response?.data?.message ? [error.response.data.message] : [error.message]);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res.data.message) {
        setErrors([res.data.message]);
        return;
      }
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response?.data?.message ? [error.response.data.message] : [error.message]);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const verifyEmail = async (token) => {
    try {
      const res = await verifyEmailRequest(token);
      setSuccessMessage(res.data.message);
    } catch (error) {
      setErrors([error.response?.data?.message || error.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyTokenRequest();
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          setUser(null);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      signup,
      signin,
      logout,
      verifyEmail,
      isAuthenticated,
      errors,
      loading,
      successMessage,
    }}>
      {children}
    </AuthContext.Provider>
  );
};