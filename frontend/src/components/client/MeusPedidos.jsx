import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle2,
  ChefHat,
  Truck,
  Package,
  RefreshCw,
} from "lucide-react";
import { getPedidosPorMesa } from "../../services/pedidoService";

export function MeusPedidos({ mesa }) {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função que busca os dados do serviço (Simulando API)
  const fetchPedidos = async () => {
    // Só mostra loading na primeira carga para não piscar a tela no polling
    if (pedidos.length === 0) setLoading(true);

    try {
      const dados = await getPedidosPorMesa(mesa);
      // Ordena: Mais recentes primeiro
      const dadosOrdenados = dados.sort((a, b) => {
        // Converte horário "HH:MM" para comparação simples (apenas para o dia atual)
        return b.dataHora.localeCompare(a.dataHora);
      });
      setPedidos(dadosOrdenados);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      if (pedidos.length === 0) setLoading(false);
    }
  };

  // Efeito de "Polling": Busca dados a cada 3 segundos para parecer tempo real
  useEffect(() => {
    fetchPedidos(); // Busca inicial
    const interval = setInterval(fetchPedidos, 3000); // Atualiza a cada 3s
    return () => clearInterval(interval);
  }, [mesa]);

  // Helper para desenhar a linha do tempo (Timeline Visual)
  const renderTimeline = (currentStatus) => {
    const steps = [
      { id: "recebido", label: "Recebido", icon: Package },
      { id: "preparando", label: "Preparo", icon: ChefHat },
      { id: "pronto", label: "Pronto", icon: CheckCircle2 },
      { id: "entregue", label: "Entregue", icon: Truck },
    ];

    // Encontrar o índice do status atual para saber o progresso (0 a 3)
    const currentIndex = steps.findIndex((s) => s.id === currentStatus);

    // Cálculo da porcentagem da barra verde
    const progressPercent = (currentIndex / (steps.length - 1)) * 100;

    return (
      <div className="relative mt-6 px-2">
        <div className="flex items-center justify-between relative z-10">
          {steps.map((step, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-white ${
                    isCompleted
                      ? "border-green-500 text-green-600 shadow-md"
                      : "border-gray-200 text-gray-300"
                  } ${isCurrent ? "scale-110 ring-4 ring-green-100" : ""}`}
                >
                  <Icon size={14} strokeWidth={isCompleted ? 2.5 : 2} />
                </div>
                <span
                  className={`text-[10px] font-bold uppercase transition-colors duration-300 ${
                    isCompleted ? "text-green-600" : "text-gray-300"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Linha de Fundo (Cinza) */}
        <div className="absolute top-[15px] left-2 right-2 h-1 bg-gray-100 -z-0 rounded-full"></div>

        {/* Linha de Progresso (Verde) */}
        <div
          className="absolute top-[15px] left-2 h-1 bg-green-500 -z-0 rounded-full transition-all duration-700 ease-out"
          style={{ width: `calc(${progressPercent}% - 16px)` }} // -16px compensa o padding
        ></div>
      </div>
    );
  };

  return (
    <div className="p-4 pb-24 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-lobster text-brand-black">Meus Pedidos</h2>
        <button
          onClick={fetchPedidos}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all active:scale-90"
          title="Atualizar agora"
        >
          <RefreshCw
            size={18}
            className={`text-gray-600 ${loading ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {pedidos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400 bg-white rounded-3xl border border-gray-100 shadow-sm border-dashed">
          <div className="bg-gray-50 p-4 rounded-full mb-3">
            <Package size={32} className="text-gray-300" />
          </div>
          <p className="font-montserrat font-bold text-gray-500">
            Nenhum pedido encontrado.
          </p>
          <p className="text-xs mt-1">Os seus pedidos aparecerão aqui.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 animate-in slide-in-from-bottom-2 fade-in duration-500"
            >
              {/* Cabeçalho do Card */}
              <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-3">
                <div>
                  <span className="font-bold text-lg text-brand-black font-montserrat tracking-tight">
                    Pedido {pedido.id}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-1 font-medium">
                    <Clock size={12} /> {pedido.dataHora}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-brand-yellow text-xl font-montserrat block leading-none">
                    R$ {pedido.total.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                    Total
                  </span>
                </div>
              </div>

              {/* Lista de Itens */}
              <div className="bg-gray-50 p-3 rounded-xl text-sm space-y-2 mb-4 border border-gray-100">
                {pedido.itens.map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex justify-between items-start text-slate-700">
                      <span className="flex-1 font-medium">
                        <strong className="mr-2 text-brand-black">
                          {item.quantity}x
                        </strong>
                        {item.name}
                      </span>
                    </div>
                    {item.observation && (
                      <span className="text-[10px] text-gray-500 italic mt-0.5 ml-6">
                        Obs: {item.observation}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Timeline de Status */}
              {renderTimeline(pedido.status)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
