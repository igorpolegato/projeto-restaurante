export const initialComandas = [
  {
    id: 1,
    mesa: 4, // Número da mesa
    cliente: "João Silva",
    status: "aberta", // aberta, fechada
    total: 125.9,
    itensacumulados: [
      { qtd: 2, nome: "Heineken 600ml", preco: 18.0, total: 36.0 },
      { qtd: 1, nome: "Combo Futevôlei", preco: 89.9, total: 89.9 },
    ],
    abertura: "19:00",
  },
  {
    id: 2,
    mesa: 10,
    cliente: "Mesa 10 (Sem nome)",
    status: "aberta",
    total: 44.0,
    itensacumulados: [
      { qtd: 2, nome: "Espeto de Picanha", preco: 22.0, total: 44.0 },
    ],
    abertura: "19:15",
  },
];
