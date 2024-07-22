import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import './css/Login.css';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();  // Asegúrate de que isAuthenticated esté disponible
  const [localErrors, setLocalErrors] = useState([]);
  const navigate = useNavigate();  // Usa el hook useNavigate para la redirección

  const onSubmit = handleSubmit(async (data) => {
    console.log('Login form data:', data);
    try {
      await signin(data);  // Asegúrate de que signin maneje errores correctamente
    } catch (error) {
      console.error('Signin error:', error);
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/foro");  // Redirige al foro si el usuario está autenticado
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (loginErrors.length > 0) {
      setLocalErrors(loginErrors);
      const timer = setTimeout(() => {
        setLocalErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loginErrors]);

  return (
    <div className="login">
      <div className="container mt-5">
        <h2>Iniciar Sesión</h2>
        {localErrors.map((error, i) => (
          <div className="alert alert-danger mt-3" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
