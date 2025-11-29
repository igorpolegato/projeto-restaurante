import React from "react";

export function CardProduto({ product, onAdd, onClick }) {
  const handleAddClick = (e) => {
    e.stopPropagation();
    onAdd();
  };

  return (
    <div
      onClick={onClick}
      className="bg-white p-3 md:p-4 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-brand-yellow cursor-pointer group flex sm:flex-col gap-4 sm:gap-0 items-center sm:items-start h-full"
    >
      <div className="w-24 h-24 sm:w-full sm:h-40 bg-brand-gray rounded-xl sm:mb-4 overflow-hidden shrink-0 relative">
        {product.image.startsWith("/") ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {product.image}
          </div>
        )}
      </div>

      <div className="flex-1 w-full flex flex-col">
        <h3 className="font-montserrat font-bold text-brand-black text-base sm:text-lg leading-tight mb-1">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-montserrat font-bold text-lg text-brand-black">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>

          <button
            onClick={handleAddClick}
            className="bg-brand-black text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors active:scale-90 shadow-md"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
