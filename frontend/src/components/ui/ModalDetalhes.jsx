import React, { useState, useEffect } from "react";
import { X, Minus, Plus } from "lucide-react";

export function ModalDetalhes({ product, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState("");

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setObservation("");
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const finalTotalPrice = product.price * quantity;

  const handleConfirm = () => {
    onAddToCart(product, quantity, observation);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-white text-brand-black shadow-lg"
        >
          <X size={24} />
        </button>

        <div className="w-full md:w-1/2 h-48 md:h-auto bg-brand-gray relative shrink-0">
          {product.image.startsWith("/") ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {product.image}
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <span className="text-xs font-montserrat font-bold text-brand-yellow uppercase tracking-wider bg-brand-black px-2 py-1 rounded">
              {product.category}
            </span>

            <h2 className="text-3xl md:text-4xl font-lobster text-brand-black mt-3 leading-none">
              {product.name}
            </h2>

            <p className="text-gray-500 mt-3 text-sm leading-relaxed font-sans">
              {product.description}
            </p>

            <div className="my-6 border-t border-gray-100"></div>

            <h3 className="font-bold text-sm mb-2">Alguma observação?</h3>
            <textarea
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Ex: Tirar a cebola, caprichar no gelo, ponto da carne..."
              className="w-full p-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-yellow text-sm resize-none h-32 placeholder:text-gray-400"
            />
          </div>

          <div className="p-4 md:p-6 border-t bg-gray-50 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 bg-white rounded-full px-2 py-1 shadow-sm border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="font-bold text-lg w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-500 block">Total</span>
                <span className="text-3xl font-montserrat font-bold text-brand-black">
                  R$ {finalTotalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-brand-yellow text-brand-black py-4 rounded-xl font-montserrat font-bold uppercase tracking-wide hover:bg-yellow-400 active:scale-95 transition-all shadow-lg"
            >
              Adicionar ao Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
