import React, { useState } from 'react';
import { User, MapPin, ArrowRight, AlertCircle } from 'lucide-react';

export function Identificacao({ onStart }) {
  const [nome, setNome] = useState('');
  const [mesa, setMesa] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores

    const numMesa = parseInt(mesa, 10);

    // --- VALIDAÇÃO DA MESA (RF: 1 a 50) ---
    if (!mesa || isNaN(numMesa)) {
      setError("Por favor, digite um número válido.");
      return;
    }

    if (numMesa < 1 || numMesa > 50) {
      setError("Mesa inválida! Escolha entre 1 e 50.");
      return;
    }

    // Se passou na validação, inicia a sessão
    onStart({ nome, mesa: numMesa });
  };

  return (
    <div className="fixed inset-0 z-50 bg-brand-black flex items-center justify-center p-4">
      {/* Imagem de Fundo (Opcional, para dar textura) */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 relative z-10">
        
        <div className="text-center mb-8">
          <h1 className="font-lobster text-4xl text-brand-yellow mb-2 tracking-wide">Pé na Areia</h1>
          <p className="text-gray-500 text-sm font-sans">Bem-vindo! Identifique sua mesa para iniciar.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Input Mesa */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1 tracking-wider font-montserrat">
              Nº da Mesa *
            </label>
            <div className="relative">
              <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-500' : 'text-brand-yellow'}`} size={20} />
              <input 
                type="number" 
                required
                min="1"
                max="50"
                placeholder="1-50"
                className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 outline-none font-bold text-lg text-brand-black transition-all ${
                  error 
                    ? 'border-red-300 focus:ring-red-200' 
                    : 'border-gray-200 focus:ring-brand-yellow'
                }`}
                value={mesa}
                onChange={(e) => {
                  setMesa(e.target.value);
                  setError(''); // Limpa erro ao digitar
                }}
              />
            </div>
            
            {/* Mensagem de Erro */}
            {error && (
              <div className="flex items-center gap-1 mt-2 text-red-500 text-xs font-bold animate-in slide-in-from-top-1">
                <AlertCircle size={12} />
                {error}
              </div>
            )}
          </div>

          {/* Input Nome (Opcional) */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1 tracking-wider font-montserrat">
              Seu Nome (Opcional)
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Ex: João"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow outline-none font-sans"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-yellow text-brand-black font-bold py-4 rounded-xl text-lg hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-yellow-200 font-montserrat active:scale-95"
          >
            Abrir Cardápio <ArrowRight size={20} />
          </button>

        </form>
      </div>
    </div>
  );
}