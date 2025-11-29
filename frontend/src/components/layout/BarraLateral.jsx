import React from "react";
import { BotaoLateral } from "./BotaoLateral";
import logoImg from "../../assets/LogoQuiosque.png";

export function BarraLateral({ categories, activeTab, onTabChange }) {
  return (
    <aside className="hidden md:flex w-24 lg:w-64 bg-brand-black text-white flex-col shadow-2xl z-20 shrink-0 transition-all duration-300">
      <div className="h-24 flex items-center justify-center border-b border-gray-800 p-6">
        <div className="w-12 h-12 bg-brand-white rounded-full border-2 border-white flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={logoImg}
            alt="Logo Pé na Areia"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="ml-3 hidden lg:flex flex-col justify-center">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
            Quiosque
          </span>
          <h1 className="font-lobster text-2xl text-white leading-none mt-1 tracking-wide">
            Pé na Areia
          </h1>
        </div>
      </div>

      {/* Navegação Limpa */}
      <nav className="flex-1 py-6 px-3 space-y-2">
        {categories.map((cat) => (
          <BotaoLateral
            key={cat.id}
            icon={cat.icon}
            label={cat.label}
            isActive={activeTab === cat.id}
            onClick={() => onTabChange(cat.id)}
          />
        ))}
      </nav>
    </aside>
  );
}
