import React from "react";
import { BotaoInferior } from "./BotaoInferior";

export function BarraInferior({ categories, activeTab, onTabChange }) {
  // Proteção contra dados nulos
  const safeCategories = categories || [];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 h-20 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-end justify-start overflow-x-auto h-full px-2 py-2 gap-1 scrollbar-hide">
        {safeCategories.map((cat) => (
          <div key={cat.id} className="flex-shrink-0 min-w-[75px]">
            <BotaoInferior
              icon={cat.icon}
              label={cat.label}
              isActive={activeTab === cat.id}
              onClick={() => onTabChange(cat.id)}
            />
          </div>
        ))}

        <div className="w-2 flex-shrink-0"></div>
      </div>
    </nav>
  );
}
