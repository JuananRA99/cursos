import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Registro.css';
import { useForm } from 'react-hook-form';
import { useAuth } from "../context/AuthContext";

function Registro() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { signup, errors: registerErrors, successMessage } = useAuth();
  const navigate = useNavigate();
  const [localSuccessMessage, setLocalSuccessMessage] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const onSubmit = handleSubmit(async (values) => {
    if (values.password !== values.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Las contraseñas no coinciden."
      });
      return;
    }
    await signup(values);
  });

  useEffect(() => {
    if (successMessage) {
      setLocalSuccessMessage(successMessage);
      setIsRedirecting(true); // Indicar que estamos en proceso de redirección
    }
  }, [successMessage]);

  useEffect(() => {
    if (localSuccessMessage && isRedirecting) {
      const timer = setTimeout(() => {
        setLocalSuccessMessage("");
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [localSuccessMessage, isRedirecting, navigate]);

  return (
    <div className="registro">
      <div className="container mt-5">
        <h2>Registrarse</h2>
        {registerErrors.map((error, i) => (
          <div className="alert alert-danger mt-3" key={i}>
            {error}
          </div>
        ))}
        {localSuccessMessage && (
          <div className="alert alert-success mt-3">
            {localSuccessMessage}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              {...register("email", { required: true })}
              required
            />
            {errors.email && (
              <p className="text-red-500">Email is required</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              {...register("username", { required: true })}
              required
            />
            {errors.username && (
              <p className="text-red-500">Username is required</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register("password", { required: true })}
              required
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              {...register("confirmPassword", { required: true })}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
