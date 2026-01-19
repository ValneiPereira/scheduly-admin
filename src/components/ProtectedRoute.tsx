import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = true 
}) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Se requer admin, verifica o role
  if (requireAdmin && !authService.isAdmin()) {
    // Redireciona para login com mensagem de erro
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
