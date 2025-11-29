import React from "react";
import { BotaoInferior } from "./BotaoInferior";

export function BarraInferior({ categories, activeTab, onTabChange }) {
  const mobileCategories = categories.slice(0, 5);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 flex justify-between items-end shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-30 h-20">
      {mobileCategories.map((cat) => (
        <BotaoInferior
          key={cat.id}
          icon={cat.icon}
          label={cat.label}
          isActive={activeTab === cat.id}
          onClick={() => onTabChange(cat.id)}
        />
      ))}
    </nav>
  );
}
