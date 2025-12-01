import React from "react";

export function CardProduto({ product, onAdd, onClick }) {
  const handleAddClick = (e) => {
    e.stopPropagation();
    onAdd();
  };

  return (
    <div
      onClick={onClick}
      className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-brand-yellow cursor-pointer group flex flex-col h-full justify-between min-h-[140px]"
    >
      {/* Parte Superior: Nome e Descrição */}
      <div className="mb-4">
        <h3 className="font-montserrat font-bold text-brand-black text-lg leading-tight mb-2 group-hover:text-brand-yellow transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
          {product.description}
        </p>
      </div>

      {/* Parte Inferior: Preço e Botão de Ação */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
        <span className="font-montserrat font-bold text-xl text-brand-black">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </span>

        <button
          onClick={handleAddClick}
          className="bg-brand-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-brand-black transition-all active:scale-90 shadow-sm"
          title="Adicionar rápido"
        >
          <span className="text-xl font-bold mb-1">+</span>
        </button>
      </div>
    </div>
  );
}
