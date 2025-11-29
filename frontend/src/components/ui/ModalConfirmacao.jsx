import React from "react";
import { Check, X } from "lucide-react";

export function ModalConfirmacao({ isOpen, onClose, onConfirm, cartItems }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
        
        <h2 className="text-2xl font-bold text-brand-black mb-2 text-center">
          Confirmar Pedido?
        </h2>
        
        <p className="text-gray-500 mb-4 text-center text-sm">
          Por favor, verifique se os itens abaixo estão corretos:
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 overflow-y-auto flex-1 border border-gray-100">
          <ul className="space-y-3">
            {cartItems.map((item, index) => (
              <li key={`${item.id}-${index}`} className="flex items-start gap-3 border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                
                <span className="bg-brand-black text-brand-yellow font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full shrink-0 mt-0.5">
                  {item.quantity}x
                </span>

                <div className="text-left">
                  <span className="font-bold text-brand-black text-sm block leading-tight">
                    {item.name}
                  </span>
                  
                  {item.observation && (
                    <span className="text-[11px] text-gray-500 italic block mt-0.5">
                      Obs: {item.observation}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 shrink-0">
          <button
            onClick={onConfirm}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200"
          >
            <Check size={20} />
            Tudo Certo, Enviar!
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-bold text-lg hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <X size={20} />
            Voltar e Corrigir
          </button>
        </div>
      </div>
    </div>
  );
}