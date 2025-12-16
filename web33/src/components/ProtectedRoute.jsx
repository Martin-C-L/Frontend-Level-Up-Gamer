import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../services/AuthService';

const ProtectedRoute = ({ adminOnly = false }) => {
  const user = AuthService.getCurrentUser();

  // 1. Si no hay usuario o token, lo mandamos al Login
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si la ruta es solo para ADMIN y el usuario no lo es
  if (adminOnly && user.rol !== 'ROLE_ADMIN') {
    alert("Acceso denegado: Se requieren permisos de administrador.");
    return <Navigate to="/" replace />;
  }

  // 3. Si todo está bien, mostramos el componente (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;