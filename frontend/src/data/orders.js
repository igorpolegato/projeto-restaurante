export const initialOrders = [
  {
    id: "#1005",
    customer: "Mesa 08",
    time: "20:05",
    status: "recebido", // Novo status inicial
    total: 55.00,
    items: [
      { quantity: 1, name: "Porção de Frango" },
      { quantity: 2, name: "Coca-Cola Lata" }
    ],
    history: [
      { status: "recebido", time: "20:05", user: "Sistema" }
    ]
  },
  {
    id: "#1001",
    customer: "Mesa 04",
    time: "19:30",
    status: "preparando",
    total: 45.00,
    items: [
      { quantity: 2, name: "Heineken 600ml" },
      { quantity: 1, name: "Porção de Batata" }
    ],
    history: [
      { status: "recebido", time: "19:30", user: "Garçom João" },
      { status: "preparando", time: "19:35", user: "Cozinha" }
    ]
  },
  {
    id: "#1002",
    customer: "Roberto (Balcão)",
    time: "19:35",
    status: "pronto",
    total: 12.00,
    items: [
      { quantity: 1, name: "Espeto de Carne", observation: "Bem passado" }
    ],
    history: [
      { status: "recebido", time: "19:35", user: "Caixa" },
      { status: "preparando", time: "19:40", user: "Cozinha" },
      { status: "pronto", time: "19:50", user: "Cozinha" }
    ]
  },
  {
    id: "#0999",
    customer: "Mesa 10",
    time: "19:10",
    status: "entregue",
    total: 22.00,
    items: [
      { quantity: 2, name: "Espeto de Queijo" }
    ],
    history: [
      { status: "recebido", time: "19:10", user: "Garçom João" },
      { status: "entregue", time: "19:25", user: "Garçom João" }
    ]
  }
];