import React from "react";
import { Search, ShoppingCart } from "lucide-react";
import logoImg from "../../assets/LogoQuiosque.png";

// ADICIONADO: 'clientName' nas props
export function Header({ cartCount, onOpenCart, clientName }) {
  // Define o nome a ser exibido (se não tiver nome, usa 'Atleta')
  const displayName = clientName ? clientName.split(" ")[0] : "Atleta";

  return (
    <header className="bg-white shadow-sm h-16 md:h-20 flex items-center justify-between px-4 md:px-8 z-10 shrink-0">
      {/* Lado Esquerdo: Logo e Marca */}
      <div className="flex items-center gap-3">
        {/* Logo Mobile */}
        <div className="md:hidden w-10 h-10 bg-brand-white rounded-full border-2 border-brand-black flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={logoImg}
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Textos */}
        <div>
          {/* VERSÃO MOBILE: Mostra a Marca */}
          <div className="md:hidden flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium font-sans">
              Quiosque
            </span>
            <h1 className="font-lobster text-lg text-brand-black leading-none tracking-wide">
              Pé na Areia
            </h1>
          </div>

          {/* VERSÃO TABLET/PC: Mostra Saudação Personalizada */}
          <div className="hidden md:block">
            {/* AQUI ESTÁ A MUDANÇA: Usando o nome dinâmico */}
            <h1 className="text-3xl font-lobster text-brand-black leading-none tracking-wide">
              Olá, {displayName}! 🏐
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-sans">
              Bora repor as energias?
            </p>
          </div>
        </div>
      </div>

      {/* Lado Direito: Busca e Carrinho */}
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="pl-9 pr-4 py-2 rounded-full bg-brand-gray border-none focus:ring-2 focus:ring-brand-yellow focus:outline-none w-48 transition-all font-sans"
          />
        </div>

        <button
          onClick={onOpenCart}
          className="relative bg-brand-black text-white p-2 md:p-3 rounded-full hover:bg-brand-yellow hover:text-black transition-colors group"
        >
          <ShoppingCart
            size={20}
            className="group-active:scale-90 transition-transform"
          />

          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white animate-bounce font-sans">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
