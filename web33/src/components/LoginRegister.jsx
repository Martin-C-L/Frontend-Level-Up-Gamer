import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthService'; // 1. Importamos el servicio

function LoginRegister() {
  const navigate = useNavigate();
  
  // 2. Usamos estado de React para los inputs (Mejor práctica que getElementById)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCrearUsuario = () => {
    navigate('/registro');
  };

  const handleLogin = async (e) => { // 3. Función asíncrona
    e.preventDefault();

    try {
      // 4. Llamamos al backend a través del servicio
      await AuthService.login(email, password);
      
      // Si no hay error, redirigimos a ofertas
      navigate('/ofertas');
      
    } catch (error) {
      console.error("Error de login:", error);
      alert('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <Link to="/" className="btn btn-dark">Inicio</Link>
      </div>

      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Vinculamos el estado
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Vinculamos el estado
              required
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <a href="#" className="text-white">¿Olvidaste tu contraseña?</a>
            <div className="extra-options">
              <input type="checkbox" id="recordarme" />
              <label htmlFor="recordarme" className="ms-2">Recordarme</label>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            <button type="button" className="btn btn-secondary w-100" onClick={handleCrearUsuario}>Crear Usuario</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginRegister;