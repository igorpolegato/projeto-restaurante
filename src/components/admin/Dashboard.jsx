import React, { useState, useEffect } from "react";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Activity,
  RefreshCw,
} from "lucide-react";
import { getDashboardStats } from "../../services/pedidoService";

export function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const dados = await getDashboardStats();
      setStats(dados);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    // Atualiza a cada 10 segundos para manter os números vivos
    const interval = setInterval(loadStats, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !stats) {
    return (
      <div className="p-10 text-center text-gray-400">
        Carregando indicadores...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Botão de Atualizar Manual */}
      <div className="flex justify-end">
        <button
          onClick={loadStats}
          className="text-sm text-gray-500 flex items-center gap-1 hover:text-brand-yellow transition-colors"
        >
          <RefreshCw size={14} /> Atualizar dados
        </button>
      </div>

      {/* Cards Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Pedidos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-brand-yellow/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-brand-yellow/20 rounded-lg text-brand-black">
                <ShoppingBag size={24} />
              </div>
              <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">
                Total de Pedidos
              </h3>
            </div>
            <p className="text-4xl font-bold mt-2 font-montserrat text-slate-800">
              {stats.totalPedidos}
            </p>
            <p className="text-xs text-gray-400 mt-1">Registrados no sistema</p>
          </div>
        </div>

        {/* Card Faturamento */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-green-100 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg text-green-700">
                <DollarSign size={24} />
              </div>
              <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">
                Faturamento
              </h3>
            </div>
            <p className="text-4xl font-bold text-green-600 mt-2 font-montserrat">
              R$ {stats.faturamento.toFixed(2).replace(".", ",")}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Receita bruta acumulada
            </p>
          </div>
        </div>

        {/* Card Ticket Médio */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-blue-100 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">
                Ticket Médio
              </h3>
            </div>
            <p className="text-4xl font-bold text-blue-600 mt-2 font-montserrat">
              R$ {stats.ticketMedio.toFixed(2).replace(".", ",")}
            </p>
            <p className="text-xs text-gray-400 mt-1">Média por pedido</p>
          </div>
        </div>
      </div>

      {/* Seção de Status (Mini Relatório) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold font-montserrat mb-4 flex items-center gap-2">
          <Activity size={20} className="text-slate-400" /> Status da Cozinha
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl text-center border border-gray-100">
            <span className="block text-2xl font-bold text-gray-600">
              {stats.porStatus.recebido}
            </span>
            <span className="text-xs uppercase font-bold text-gray-400">
              Na Fila
            </span>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl text-center border border-blue-100">
            <span className="block text-2xl font-bold text-blue-600">
              {stats.porStatus.preparando}
            </span>
            <span className="text-xs uppercase font-bold text-blue-400">
              Preparando
            </span>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl text-center border border-orange-100">
            <span className="block text-2xl font-bold text-orange-600">
              {stats.porStatus.pronto}
            </span>
            <span className="text-xs uppercase font-bold text-orange-400">
              Aguardando
            </span>
          </div>
          <div className="p-4 bg-green-50 rounded-xl text-center border border-green-100">
            <span className="block text-2xl font-bold text-green-600">
              {stats.porStatus.entregue}
            </span>
            <span className="text-xs uppercase font-bold text-green-400">
              Entregues
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
