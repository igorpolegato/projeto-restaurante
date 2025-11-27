import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  Receipt,
  ClipboardList,
} from "lucide-react";

// Importação dos Componentes Administrativos
import { Dashboard } from "../components/admin/Dashboard";
import { GerenciarProdutos } from "../components/admin/GerenciarProdutos";
import { GerenciarPedidos } from "../components/admin/GerenciarPedidos";
import { GerenciarComandas } from "../components/admin/GerenciarComandas";
import { HistoricoPedidos } from "../components/admin/HistoricoPedidos";

// Importação do Serviço de Autenticação
import { authService } from "../services/authService";

export function TelaAdmin() {
  // Estado para controlar qual secção do admin está visível
  const [activeSection, setActiveSection] = useState("dashboard");

  // --- FUNÇÃO DE LOGOUT ---
  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair do sistema?")) {
      authService.logout();
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-800">
      {/* Sidebar do Admin (Menu Lateral) */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 transition-all">
        <div className="h-20 flex items-center justify-center border-b border-slate-700 font-lobster text-2xl tracking-wide">
          Admin
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {/* Botão Dashboard */}
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
              activeSection === "dashboard"
                ? "bg-brand-yellow text-slate-900 font-bold"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          {/* Botão Comandas / Mesas */}
          <button
            onClick={() => setActiveSection("comandas")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
              activeSection === "comandas"
                ? "bg-brand-yellow text-slate-900 font-bold"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Receipt size={20} />
            Mesas / Caixa
          </button>

          {/* Botão Pedidos (Cozinha) */}
          <button
            onClick={() => setActiveSection("pedidos")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
              activeSection === "pedidos"
                ? "bg-brand-yellow text-slate-900 font-bold"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <ShoppingBag size={20} />
            Cozinha
          </button>

          {/* Botão Histórico */}
          <button
            onClick={() => setActiveSection("historico")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
              activeSection === "historico"
                ? "bg-brand-yellow text-slate-900 font-bold"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <ClipboardList size={20} />
            Histórico
          </button>

          {/* Botão Cardápio (Produtos) */}
          <button
            onClick={() => setActiveSection("produtos")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
              activeSection === "produtos"
                ? "bg-brand-yellow text-slate-900 font-bold"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Menu size={20} />
            Cardápio
          </button>

          {/* Botão Configurações */}
          <button className="flex items-center gap-3 w-full p-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <Settings size={20} />
            Configurações
          </button>
        </nav>

        {/* Rodapé da Sidebar */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Cabeçalho Superior Dinâmico */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-montserrat capitalize text-slate-800">
            {activeSection === "produtos"
              ? "Gerir Cardápio"
              : activeSection === "pedidos"
              ? "Monitor de Cozinha"
              : activeSection === "comandas"
              ? "Gestão de Mesas"
              : activeSection === "historico"
              ? "Histórico de Vendas"
              : "Visão Geral"}
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">Admin User</p>
              <p className="text-xs text-slate-500">Gerente</p>
            </div>
            <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center font-bold text-slate-900 shadow-sm">
              A
            </div>
          </div>
        </header>

        {/* RENDERIZAÇÃO CONDICIONAL DAS SECÇÕES */}

        {/* 1. Secção Dashboard */}
        {activeSection === "dashboard" && <Dashboard />}

        {/* 2. Secção Produtos (CRUD) */}
        {activeSection === "produtos" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 h-full">
            <GerenciarProdutos />
          </div>
        )}

        {/* 3. Secção Pedidos (Monitor de Cozinha) */}
        {activeSection === "pedidos" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 h-full">
            <GerenciarPedidos />
          </div>
        )}

        {/* 4. Secção Comandas (Caixa) */}
        {activeSection === "comandas" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 h-full">
            <GerenciarComandas />
          </div>
        )}

        {/* 5. Secção Histórico (Relatórios) */}
        {activeSection === "historico" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 h-full">
            <HistoricoPedidos />
          </div>
        )}
      </main>
    </div>
  );
}
