import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { getPedidos } from "../../services/pedidoService";

export function HistoricoPedidos() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [expandedRow, setExpandedRow] = useState(null); // Para ver detalhes do item

  // Carregar dados
  useEffect(() => {
    const loadData = async () => {
      const data = await getPedidos();
      // Garante ordenação por data (mais recente primeiro)
      // Utiliza o campo ISO para ordenação correta
      const sorted = data.sort((a, b) => {
        const dateA = a.dataCriacaoISO ? new Date(a.dataCriacaoISO) : 0;
        const dateB = b.dataCriacaoISO ? new Date(b.dataCriacaoISO) : 0;
        return dateB - dateA;
      });
      setOrders(sorted);
      setFilteredOrders(sorted);
    };
    loadData();
  }, []);

  // Filtros (Executa sempre que a busca ou o seletor mudam)
  useEffect(() => {
    let result = orders;

    // Filtro de Texto
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toString().includes(term) ||
          (o.cliente || o.customer || "").toLowerCase().includes(term) ||
          (o.mesa && o.mesa.toString().includes(term))
      );
    }

    // Filtro de Status
    if (statusFilter !== "todos") {
      result = result.filter((o) => o.status === statusFilter);
    }

    setFilteredOrders(result);
  }, [searchTerm, statusFilter, orders]);

  // Cores dos Status (Badge)
  const getStatusStyle = (status) => {
    switch (status) {
      case "recebido":
        return "bg-gray-100 text-gray-600";
      case "preparando":
        return "bg-blue-100 text-blue-700";
      case "pronto":
        return "bg-orange-100 text-orange-700";
      case "entregue":
        return "bg-green-100 text-green-700";
      case "fechado":
        return "bg-slate-800 text-white"; // Pedido pago/fechado
      case "cancelado":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const toggleDetails = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold font-montserrat text-slate-800">
            Histórico de Vendas
          </h2>
          <p className="text-slate-500 text-sm">
            Registo completo de todas as transações
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-slate-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-bold">
          <Download size={18} /> Exportar CSV
        </button>
      </div>

      {/* Barra de Ferramentas */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Busca */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar por ID, Mesa ou Cliente..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-yellow outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filtro Status */}
        <div className="relative">
          <Filter
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <select
            className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-yellow outline-none bg-white text-sm appearance-none cursor-pointer min-w-[150px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="todos">Todos os Status</option>
            <option value="recebido">Recebidos</option>
            <option value="preparando">Em Preparo</option>
            <option value="pronto">Prontos</option>
            <option value="entregue">Entregues</option>
            <option value="fechado">Fechados (Pagos)</option>
          </select>
        </div>

        {/* Filtro Data (Visual apenas para este exemplo) */}
        <div className="relative">
          <Calendar
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <select className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-yellow outline-none bg-white text-sm appearance-none cursor-pointer">
            <option>Hoje</option>
            <option>Últimos 7 dias</option>
            <option>Este Mês</option>
          </select>
        </div>
      </div>

      {/* Tabela de Dados */}
      <div className="flex-1 overflow-auto rounded-xl border border-gray-200 custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
            <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              <th className="p-4 border-b border-gray-200">Pedido</th>
              <th className="p-4 border-b border-gray-200">Data/Hora</th>
              <th className="p-4 border-b border-gray-200">Cliente/Mesa</th>
              <th className="p-4 border-b border-gray-200">Status</th>
              <th className="p-4 border-b border-gray-200 text-right">Total</th>
              <th className="p-4 border-b border-gray-200 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map((order) => (
              <React.Fragment key={order.id}>
                <tr
                  className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                    expandedRow === order.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => toggleDetails(order.id)}
                >
                  <td className="p-4 font-bold text-slate-800 font-montserrat">
                    {order.id}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <div className="flex flex-col">
                      <span>{order.dataLegivel || "Hoje"}</span>
                      <span className="text-xs text-gray-400">
                        {order.horario || order.time}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-700 font-medium">
                    {order.cliente || order.customer || `Mesa ${order.mesa}`}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right font-bold text-slate-800 font-montserrat">
                    R$ {order.total.toFixed(2).replace(".", ",")}
                  </td>
                  <td className="p-4 text-gray-400">
                    {expandedRow === order.id ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </td>
                </tr>

                {/* Linha de Detalhes (Expansível) */}
                {expandedRow === order.id && (
                  <tr className="bg-gray-50 animate-in slide-in-from-top-2 fade-in duration-200">
                    <td colSpan="6" className="p-0">
                      <div className="p-4 pl-10 border-b border-gray-200 shadow-inner grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50">
                        {/* Lista de Itens */}
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
                            Itens do Pedido
                          </h4>
                          <ul className="space-y-2 text-sm bg-white p-3 rounded-lg border border-gray-200">
                            {(order.itens || order.items || []).map(
                              (item, idx) => (
                                <li
                                  key={idx}
                                  className="flex justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0"
                                >
                                  <span className="text-slate-700">
                                    <strong className="mr-2 text-brand-black">
                                      {item.quantity}x
                                    </strong>{" "}
                                    {item.name}
                                  </span>
                                  {item.price && (
                                    <span className="text-gray-500 font-medium">
                                      R${" "}
                                      {(item.price * item.quantity).toFixed(2)}
                                    </span>
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        {/* Histórico de Status */}
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
                            Histórico de Alterações
                          </h4>
                          <ul className="space-y-0 text-xs bg-white p-3 rounded-lg border border-gray-200 max-h-[150px] overflow-y-auto custom-scrollbar">
                            {(order.history || []).map((h, idx) => (
                              <li
                                key={idx}
                                className="flex gap-3 py-2 border-b border-gray-50 last:border-0"
                              >
                                <span className="text-gray-400 font-mono w-16">
                                  {h.time}
                                </span>
                                <div className="flex flex-col">
                                  <span
                                    className={`font-bold uppercase text-[10px] w-fit px-1.5 rounded ${getStatusStyle(
                                      h.status
                                    )}`}
                                  >
                                    {h.status}
                                  </span>
                                  <span className="text-gray-500 mt-0.5">
                                    por {h.user}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search size={48} className="text-gray-200 mb-4" />
            <p>Nenhum registo encontrado com estes filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
