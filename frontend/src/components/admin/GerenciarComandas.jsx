import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Search,
  User,
  Clock,
  Receipt,
  RefreshCw,
} from "lucide-react";
// MUDANÇA: Importamos o serviço real em vez do mock estático
import {
  getPedidos,
  atualizarStatusPedido,
} from "../../services/pedidoService";

export function GerenciarComandas() {
  const [comandas, setComandas] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- BUSCAR E AGRUPAR PEDIDOS ---
  const fetchComandas = async () => {
    setLoading(true);
    try {
      const pedidosRaw = await getPedidos();

      // Filtra apenas pedidos que NÃO estão pagos/fechados (status 'fechado' é um exemplo)
      const pedidosAtivos = pedidosRaw.filter((p) => p.status !== "fechado");

      // Lógica para AGRUPAR pedidos por mesa
      const mesasMap = {};

      pedidosAtivos.forEach((pedido) => {
        const numMesa = pedido.mesa;

        if (!mesasMap[numMesa]) {
          mesasMap[numMesa] = {
            id: numMesa, // Usamos o número da mesa como ID do agrupamento
            mesa: numMesa,
            cliente: pedido.cliente, // Pega o nome do primeiro pedido
            abertura: pedido.dataHora, // Pega a hora do primeiro pedido
            total: 0,
            itensacumulados: [],
            pedidosIds: [], // Guarda os IDs originais para poder fechar depois
          };
        }

        // Soma valores e itens
        mesasMap[numMesa].total += pedido.total;
        mesasMap[numMesa].pedidosIds.push(pedido.id);

        // Agrega itens para visualização resumida
        pedido.itens.forEach((item) => {
          mesasMap[numMesa].itensacumulados.push({
            qtd: item.quantity,
            nome: item.name,
            total: item.quantity * (item.price || 0), // Assumindo que temos preço no item, senão teria que vir do pedido
          });
        });
      });

      // Transforma o Objeto em Array para exibir
      setComandas(Object.values(mesasMap));
    } catch (error) {
      console.error("Erro ao carregar comandas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza a cada 5 segundos para ver novas mesas abrindo
  useEffect(() => {
    fetchComandas();
    const interval = setInterval(fetchComandas, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- FECHAR CONTA ---
  const handleFecharConta = async (mesaObj) => {
    const confirmacao = window.confirm(
      `Fechar conta da Mesa ${mesaObj.mesa}?\nTotal: R$ ${mesaObj.total.toFixed(
        2
      )}`
    );

    if (confirmacao) {
      // Num sistema real, marcaríamos como 'pago' no banco.
      // Aqui, vamos iterar sobre os pedidos dessa mesa e mudar status para 'fechado'
      for (const pedidoId of mesaObj.pedidosIds) {
        await atualizarStatusPedido(pedidoId, "fechado", "Caixa");
      }

      alert("Conta fechada e mesa liberada!");
      fetchComandas(); // Atualiza a tela
    }
  };

  // Totais Gerais
  const totalFaturamentoAberto = comandas.reduce((acc, c) => acc + c.total, 0);

  return (
    <div className="space-y-6">
      {/* Resumo do Topo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-brand-black text-white p-5 rounded-2xl shadow-lg flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase">
              Mesas Ocupadas
            </h3>
            <p className="text-3xl font-montserrat font-bold mt-1">
              {comandas.length}
            </p>
          </div>
          <Receipt size={32} className="text-brand-yellow opacity-50" />
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-bold text-gray-400 uppercase">
            Total em Aberto
          </h3>
          <p className="text-3xl font-montserrat font-bold text-green-600 mt-1">
            R$ {totalFaturamentoAberto.toFixed(2).replace(".", ",")}
          </p>
        </div>

        {/* Botão de Atualizar Manual */}
        <button
          onClick={fetchComandas}
          className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center gap-3 text-slate-600 hover:bg-gray-50 transition-colors"
        >
          <RefreshCw size={24} className={loading ? "animate-spin" : ""} />
          <span className="font-bold">Atualizar Painel</span>
        </button>
      </div>

      {/* Grid de Mesas */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 min-h-[400px]">
        <h2 className="text-xl font-bold font-montserrat mb-6 flex items-center gap-2 text-slate-800">
          <Receipt size={24} className="text-brand-yellow" />
          Comandas Ativas
        </h2>

        {comandas.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Nenhuma mesa aberta no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {comandas.map((comanda) => (
              <div
                key={comanda.id}
                className="border-2 border-gray-100 rounded-xl p-4 hover:border-brand-yellow transition-all shadow-sm flex flex-col relative overflow-hidden group bg-white"
              >
                {/* Faixa decorativa */}
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow"></div>

                <div className="flex justify-between items-start mb-3">
                  <div className="bg-brand-black text-white px-3 py-1 rounded-lg font-bold text-sm font-montserrat">
                    Mesa {comanda.mesa}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={12} /> {comanda.abertura}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-50">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                    <User size={16} />
                  </div>
                  <span
                    className="font-medium text-slate-700 truncate text-sm"
                    title={comanda.cliente}
                  >
                    {comanda.cliente}
                  </span>
                </div>

                {/* Lista Resumida de Consumo */}
                <div className="bg-gray-50 p-3 rounded-lg flex-1 mb-4 border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-wider">
                    Resumo do Consumo:
                  </p>
                  <div className="space-y-1 max-h-32 overflow-y-auto text-sm custom-scrollbar pr-1">
                    {comanda.itensacumulados.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-start text-xs text-slate-600"
                      >
                        <span className="line-clamp-1 flex-1 mr-2">
                          {item.qtd}x {item.nome}
                        </span>
                        {/* Nota: Se não tivermos preço individual no item salvo no pedido, 
                                                pode ser necessário ajustar a lógica de 'pedidoService' para salvar preço unitário */}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-bold">
                      Total
                    </span>
                    <span className="text-xl font-bold text-brand-black font-montserrat">
                      R$ {comanda.total.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <button
                    onClick={() => handleFecharConta(comanda)}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-200 flex items-center gap-1 transition-colors uppercase tracking-wide"
                  >
                    <DollarSign size={14} /> Fechar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
