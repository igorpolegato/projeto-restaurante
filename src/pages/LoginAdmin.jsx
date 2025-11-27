import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { authService } from "../services/authService";

export function LoginAdmin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.login(email, password);

      if (response.success) {
        navigate("/admin"); // Sucesso! Vai para o painel
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* Container Principal */}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Lado Esquerdo: Visual/Marca */}
        <div className="bg-brand-yellow w-full md:w-1/2 p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          <div className="bg-white p-4 rounded-full shadow-lg mb-6 z-10">
            <ShieldCheck size={48} className="text-slate-900" />
          </div>

          <h1 className="font-lobster text-4xl text-slate-900 mb-2 z-10">
            Pé na Areia
          </h1>
          <p className="text-slate-800 font-medium z-10">
            Painel Administrativo
          </p>
          <p className="text-slate-700 text-sm mt-4 max-w-xs z-10">
            Gerencie pedidos, cardápio e faturamento em um só lugar.
          </p>
        </div>

        {/* Lado Direito: Formulário */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white">
          <h2 className="text-2xl font-bold font-montserrat text-slate-800 mb-2">
            Bem-vindo de volta
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            Insira suas credenciais para acessar.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Input Email */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">
                E-mail
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  required
                  placeholder="admin@quiosque.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow outline-none transition-all text-slate-700 font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Input Senha */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">
                Senha
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow outline-none transition-all text-slate-700 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg flex items-center justify-center animate-in slide-in-from-top-1">
                {error}
              </div>
            )}

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Verificando...
                </>
              ) : (
                <>
                  Acessar Painel <ArrowRight size={20} />
                </>
              )}
            </button>

            <div className="text-center mt-6">
              <a
                href="/"
                className="text-sm text-gray-400 hover:text-brand-yellow transition-colors underline"
              >
                Voltar para o Quiosque (Cliente)
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
