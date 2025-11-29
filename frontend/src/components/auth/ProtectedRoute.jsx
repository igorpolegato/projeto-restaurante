import React from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../../services/authService";

export function ProtectedRoute({ children }) {
  const isAuth = authService.isAuthenticated();

  if (!isAuth) {
    // Se não estiver logado, redireciona para o login
    return <Navigate to="/admin/login" replace />;
  }

  // Se estiver logado, deixa passar (renderiza a tela Admin)
  return children;
}
