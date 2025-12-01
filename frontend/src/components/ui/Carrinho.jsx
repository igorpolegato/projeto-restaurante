import React from "react";
import { X, Trash2, Minus, Plus } from "lucide-react";

export function Carrinho({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) {
  if (!isOpen) return null;

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Cabeçalho */}
        <div className="p-5 border-b flex items-center justify-between bg-brand-black text-white">
          <h2 className="text-2xl font-lobster font-normal tracking-wide">
            Seu Pedido
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <p>Seu carrinho está vazio.</p>
              <p className="text-sm">Adicione itens para começar!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 border-b border-gray-100 pb-4 last:border-0"
              >
                {/* Linha Superior: Nome e Preço */}
                <div className="flex justify-between items-start">
                  <h3 className="font-montserrat font-bold text-sm text-brand-black line-clamp-2 pr-4">
                    {item.name}
                  </h3>
                  <span className="font-bold text-sm text-brand-black whitespace-nowrap">
                    R${" "}
                    {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                  </span>
                </div>

                {/* Observação (se houver) */}
                {item.observation && (
                  <p className="text-[11px] text-gray-500 italic bg-gray-50 p-2 rounded border border-gray-100">
                    Obs: {item.observation}
                  </p>
                )}

                {/* Linha Inferior: Controles */}
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-400">
                    Unitário: R$ {item.price.toFixed(2).replace(".", ",")}
                  </p>

                  <div className="flex items-center gap-3">
                    {/* Controle de Quantidade */}
                    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm active:scale-90 text-brand-black hover:text-red-500 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center text-brand-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm active:scale-90 text-brand-black hover:text-green-600 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Botão Remover */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-400 p-2 hover:bg-red-50 rounded-full transition-colors"
                      title="Remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé */}
        <div className="p-5 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 font-medium">Total</span>
            <span className="text-3xl font-montserrat font-bold text-brand-black">
              R$ {total.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <button
            onClick={onCheckout}
            disabled={cartItems.length === 0}
            className="w-full bg-green-600 text-white py-4 font-montserrat font-bold uppercase tracking-wider rounded-xl text-lg hover:bg-green-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-200"
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}
