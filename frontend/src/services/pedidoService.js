// --- SERVIÇO DE PEDIDOS (CAMADA DE DADOS) ---

const STORAGE_KEY = "quiosque_pedidos";

const simulateNetworkDelay = () =>
  new Promise((resolve) => setTimeout(resolve, 300));

/**
 * Busca todos os pedidos armazenados
 */
export const getPedidos = async () => {
  await simulateNetworkDelay();
  const data = localStorage.getItem(STORAGE_KEY);
  let pedidos = data ? JSON.parse(data) : [];

  // ORDENAÇÃO AUTOMÁTICA: Do mais novo para o mais antigo
  // Usa o campo ISO que vamos criar abaixo para garantir ordem cronológica correta
  return pedidos.sort((a, b) => {
    const dataA = new Date(a.dataCriacaoISO || 0);
    const dataB = new Date(b.dataCriacaoISO || 0);
    return dataB - dataA; // Decrescente
  });
};

/**
 * Cria um novo pedido vindo do cliente
 */
export const criarPedido = async (pedido) => {
  await simulateNetworkDelay();
  const pedidosAtuais = await getPedidos();

  // CAPTURA A DATA/HORA EXATA DO SERVIDOR (Simulado)
  const agora = new Date();

  const novoPedido = {
    ...pedido,
    id: `#${Math.floor(Math.random() * 10000)}`,
    status: "recebido",

    // --- NOVOS CAMPOS DE CONTROLE DE TEMPO ---
    dataCriacaoISO: agora.toISOString(), // Perfeito para Banco de Dados e Ordenação
    dataLegivel: agora.toLocaleDateString("pt-BR"), // Ex: 27/11/2025
    horario: agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }), // Ex: 14:30
    // -----------------------------------------

    history: [
      {
        status: "recebido",
        time: agora.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        user: "Cliente",
      },
    ],
  };

  // Salva no começo da lista (Unshift é mais performático visualmente aqui)
  const novaLista = [novoPedido, ...pedidosAtuais];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));

  window.dispatchEvent(new Event("storage"));

  return novoPedido;
};

/**
 * Atualiza o status de um pedido
 */
export const atualizarStatusPedido = async (id, novoStatus, usuario) => {
  await simulateNetworkDelay();
  // Busca direto do localStorage para evitar loop de ordenação desnecessário na escrita
  const data = localStorage.getItem(STORAGE_KEY);
  const pedidos = data ? JSON.parse(data) : [];

  const agora = new Date();
  const horarioAtual = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const pedidosAtualizados = pedidos.map((p) => {
    if (p.id === id) {
      return {
        ...p,
        status: novoStatus,
        history: [
          ...(p.history || []),
          { status: novoStatus, time: horarioAtual, user: usuario },
        ],
      };
    }
    return p;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidosAtualizados));
  return pedidosAtualizados; // Retorna para atualizar a UI
};

/**
 * Busca pedidos de uma mesa específica
 */
export const getPedidosPorMesa = async (mesa) => {
  await simulateNetworkDelay();
  const pedidos = await getPedidos(); // Já vem ordenado pela função getPedidos
  return pedidos.filter((p) => p.mesa.toString() === mesa.toString());
};

/**
 * Calcula estatísticas para o Dashboard
 */
export const getDashboardStats = async () => {
  await simulateNetworkDelay();
  const pedidos = await getPedidos();

  // Filtrar apenas pedidos de HOJE para o dashboard diário (opcional)
  const hoje = new Date().toLocaleDateString("pt-BR");
  const pedidosHoje = pedidos.filter((p) => p.dataLegivel === hoje);

  const faturamento = pedidosHoje.reduce(
    (acc, pedido) => acc + (pedido.total || 0),
    0
  );
  const totalPedidos = pedidosHoje.length;
  const ticketMedio = totalPedidos > 0 ? faturamento / totalPedidos : 0;

  const porStatus = {
    recebido: pedidosHoje.filter((p) => p.status === "recebido").length,
    preparando: pedidosHoje.filter((p) => p.status === "preparando").length,
    pronto: pedidosHoje.filter((p) => p.status === "pronto").length,
    entregue: pedidosHoje.filter((p) => p.status === "entregue").length,
  };

  return {
    faturamento,
    totalPedidos,
    ticketMedio,
    porStatus,
  };
};
