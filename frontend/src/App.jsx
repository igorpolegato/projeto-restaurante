import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
import { TelaCliente } from "./pages/TelaCliente";
import { TelaAdmin } from "./pages/TelaAdmin";
import { LoginAdmin } from "./pages/LoginAdmin";

// Componente de Segurança (Porteiro)
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- ÁREA DO CLIENTE (Pública) --- */}
        <Route path="/" element={<TelaCliente />} />

        {/* --- ÁREA ADMINISTRATIVA --- */}

        {/* Tela de Login (Pública) */}
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/* Painel Principal (Protegido) */}
        {/* Só acessa se tiver o token de autenticação, senão vai pro login */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <TelaAdmin />
            </ProtectedRoute>
          }
        />

        {/* Rota para capturar 404 (Opcional, redireciona para home) */}
        <Route path="*" element={<TelaCliente />} />
      </Routes>
    </BrowserRouter>
  );
}
