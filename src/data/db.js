import {
  Home,
  Flame,
  Beer,
  Wine,
  GlassWater,
  UtensilsCrossed,
  Beef,
  IceCream,
} from "lucide-react";

export const categories = [
  { id: "home", label: "Início", icon: Home },
  { id: "destaques", label: "Destaques", icon: Flame },
  { id: "espetos", label: "Espetos", icon: Beef },
  { id: "porcoes", label: "Porções e Lanches", icon: UtensilsCrossed },
  { id: "cervejas", label: "Cervejas", icon: Beer },
  { id: "drinks", label: "Drinks e Doses", icon: Wine },
  { id: "bebidas", label: "Sem Álcool", icon: GlassWater },
  { id: "sobremesas", label: "Açaí e Frutas", icon: IceCream },
];

export const products = [
  {
    id: 1,
    name: "Espeto de Carne",
    description: "Carne macia selecionada, assada na brasa no ponto ideal.",
    price: 12.0,
    image: "/produtos/espeto-carne.png",
    category: "espetos",
  },

  // --- CERVEJAS ---
  {
    id: 11,
    name: "Heineken 600ml",
    description: "Garrafa 600ml. Gelada trincando.",
    price: 18.0,
    image: "/produtos/heineken-600.jpg",
    category: "cervejas",
  },

  // --- DRINKS E DOSES ---
  {
    id: 18,
    name: "Copão de Whisky",
    description: "Dose generosa com gelo de água de coco (opcional).",
    price: 26.0,
    image: "/produtos/whisky.jpg",
    category: "drinks",
  },

  // --- SOBREMESAS / AÇAÍ ---
  {
    id: 22,
    name: "Açaí na Tigela",
    description:
      "Até 4 complementos: Leite em pó, Leite condensado, Granola, Paçoca, Fruta do dia.",
    price: 18.9,
    image: "/produtos/acai.jpg",
    category: "sobremesas",
  },

  // --- SEM ÁLCOOL ---
  {
    id: 25,
    name: "Suco de Laranja",
    description: "Natural, feito na hora. Copo grande.",
    price: 12.0,
    image: "/produtos/suco-laranja.jpg",
    category: "bebidas",
  },
];
