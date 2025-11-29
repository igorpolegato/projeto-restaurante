import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle2,
  Truck,
  Search,
  Bell,
  ChefHat,
  Play,
  Undo2,
} from "lucide-react";
// Importamos as funções do Serviço
import {
  getPedidos,
  atualizarStatusPedido,
} from "../../services/pedidoService";

export function GerenciarPedidos() {
  const [orders, setOrders] = useState([]); // Inicia vazio, carrega do serviço
  const [filterStatus, setFilterStatus] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [newOrderNotification, setNewOrderNotification] = useState(false);

  // --- CARREGAMENTO DE DADOS (POLLING) ---
  const fetchOrders = async () => {
    try {
      const dados = await getPedidos();

      // Verifica se entrou pedido novo comparando o tamanho da lista
      setOrders((prevOrders) => {
        // Se a lista nova for maior que a anterior (e não for a primeira carga)
        if (prevOrders.length > 0 && dados.length > prevOrders.length) {
          setNewOrderNotification(true);
          // Opcional: Tocar som aqui
        }
        return dados;
      });
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  // Carrega ao iniciar e atualiza a cada 5 segundos (Sincronização)
  useEffect(() => {
    fetchOrders(); // Busca imediata
    const interval = setInterval(fetchOrders, 5000); // Polling
    return () => clearInterval(interval);
  }, []);

  // --- ATUALIZAR STATUS (ASYNC) ---
  const handleAdvanceStatus = async (orderId, currentStatus) => {
    let nextStatus = currentStatus;
    if (currentStatus === "recebido") nextStatus = "preparando";
    else if (currentStatus === "preparando") nextStatus = "pronto";
    else if (currentStatus === "pronto") nextStatus = "entregue";

    if (nextStatus === currentStatus) return;

    // Chama o serviço (Simulando Backend)
    const listaAtualizada = await atualizarStatusPedido(
      orderId,
      nextStatus,
      "Admin (Avançou)"
    );
    setOrders(listaAtualizada);
  };

  // --- REVERTER STATUS (ASYNC) ---
  const handleRevertStatus = async (orderId, currentStatus) => {
    let prevStatus = currentStatus;
    if (currentStatus === "entregue") prevStatus = "pronto";
    else if (currentStatus === "pronto") prevStatus = "preparando";
    else if (currentStatus === "preparando") prevStatus = "recebido";

    if (prevStatus === currentStatus) return;

    // Chama o serviço (Simulando Backend)
    const listaAtualizada = await atualizarStatusPedido(
      orderId,
      prevStatus,
      "Admin (Corrigiu)"
    );
    setOrders(listaAtualizada);
  };

  // --- FILTROS ---
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "todos" || order.status === filterStatus;

    // Proteção: Garante que cliente/customer exista antes de chamar toLowerCase
    // O sistema suporta 'cliente' (novo) ou 'customer' (antigo)
    const clienteNome = order.cliente || order.customer || "Cliente";
    // Proteção para o número da mesa
    const numeroMesa = order.mesa ? order.mesa.toString() : "";

    const matchesSearch =
      clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm) ||
      numeroMesa.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  // --- HELPERS VISUAIS ---
  const getStatusColor = (status) => {
    switch (status) {
      case "recebido":
        return "bg-gray-100 text-gray-600 border-gray-200";
      case "preparando":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "pronto":
        return "bg-orange-50 text-orange-600 border-orange-200"; // Pronto (Aguardando entrega)
      case "entregue":
        return "bg-green-50 text-green-600 border-green-200";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const renderMainAction = (status, id) => {
    switch (status) {
      case "recebido":
        return (
          <button
            onClick={() => handleAdvanceStatus(id, status)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Play size={16} fill="currentColor" /> Iniciar
          </button>
        );
      case "preparando":
        return (
          <button
            onClick={() => handleAdvanceStatus(id, status)}
            className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm font-bold hover:bg-orange-600 flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <ChefHat size={18} /> Pronto
          </button>
        );
      case "pronto":
        return (
          <button
            onClick={() => handleAdvanceStatus(id, status)}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-700 flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Truck size={18} /> Entregar
          </button>
        );
      default:
        return (
          <span className="flex-1 block text-center text-xs text-gray-400 font-medium italic py-2 border border-dashed border-gray-200 rounded-lg bg-gray-50">
            Finalizado
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
      {/* Notificação */}
      {newOrderNotification && (
        <div
          className="bg-brand-yellow text-brand-black p-3 rounded-lg mb-4 flex items-center justify-between animate-bounce shadow-md cursor-pointer hover:bg-yellow-400 transition-colors"
          onClick={() => setNewOrderNotification(false)}
        >
          <div className="flex items-center gap-2 font-bold">
            <Bell size={20} /> Novo pedido recebido!
          </div>
          <button className="text-sm underline font-medium">
            Atualizar lista
          </button>
        </div>
      )}

      {/* Cabeçalho e Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold font-montserrat text-slate-800">
            Monitor de Cozinha
          </h2>
          <p className="text-slate-500 text-sm">Gerencie o fluxo de produção</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg overflow-x-auto max-w-full scrollbar-hide">
          {["todos", "recebido", "preparando", "pronto", "entregue"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-md text-xs md:text-sm font-medium capitalize whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? "bg-white text-slate-800 shadow-sm font-bold ring-1 ring-black/5"
                    : "text-slate-500 hover:text-slate-700 hover:bg-gray-200/50"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Busca */}
      <div className="relative mb-6">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Buscar por Mesa, Nº do pedido ou Cliente..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pb-20 custom-scrollbar">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className={`border rounded-xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-300 ${
              order.status === "entregue"
                ? "opacity-75 bg-gray-50 border-gray-100"
                : "bg-white border-gray-200"
            }`}
          >
            {/* Topo */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-lg text-slate-800 font-montserrat">
                    {order.id}
                  </span>

                  {/* Badge da Mesa - MOSTRAR NÚMERO DA MESA */}
                  {order.mesa && (
                    <span className="bg-slate-800 text-brand-yellow text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Mesa {order.mesa}
                    </span>
                  )}
                </div>

                <p
                  className="text-sm text-gray-600 font-medium line-clamp-1"
                  title={order.cliente || order.customer}
                >
                  {order.cliente || order.customer}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* Itens */}
            <div className="bg-gray-50 p-3 rounded-lg space-y-2 border border-gray-100 flex-1">
              {/* Lida com 'itens' (service) ou 'items' (mock antigo) */}
              {(order.itens || order.items || []).map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col text-sm border-b border-gray-200 last:border-0 pb-2 last:pb-0"
                >
                  <span className="text-slate-700 font-medium leading-tight">
                    <span className="font-bold mr-1">{item.quantity}x</span>{" "}
                    {item.name}
                  </span>
                  {item.observation && (
                    <span className="text-xs text-red-500 italic mt-0.5 block bg-red-50 px-1 rounded w-fit">
                      Obs: {item.observation}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Info Tempo e Histórico */}
            <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 pt-3 mt-1">
              <div
                className="flex items-center gap-1"
                title="Horário do pedido"
              >
                <Clock size={14} />
                {/* Prioriza 'horario' (novo padrão) sobre 'dataHora' ou 'time' */}
                {order.horario || order.dataHora || order.time}
              </div>
              <span className="font-bold text-slate-800 text-sm font-montserrat">
                R$ {order.total.toFixed(2).replace(".", ",")}
              </span>
            </div>

            {/* Histórico */}
            {order.history && order.history.length > 0 && (
              <div className="text-[10px] text-gray-400 text-center border-t border-gray-50 pt-1 truncate">
                Última atualização:{" "}
                {order.history[order.history.length - 1].time}
              </div>
            )}

            {/* AÇÕES: Botão Voltar + Botão Avançar */}
            <div className="mt-1 flex gap-2">
              {order.status !== "recebido" && (
                <button
                  onClick={() => handleRevertStatus(order.id, order.status)}
                  className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 hover:text-slate-800 transition-colors"
                  title="Voltar Status Anterior (Correção)"
                >
                  <Undo2 size={18} />
                </button>
              )}

              {renderMainAction(order.status, order.id)}
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
            <div className="bg-gray-100 p-4 rounded-full mb-3">
              <Search size={32} className="text-gray-300" />
            </div>
            <p>Nenhum pedido encontrado com este filtro.</p>
          </div>
        )}
      </div>
    </div>
  );
}
