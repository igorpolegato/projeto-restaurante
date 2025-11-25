import React from 'react';

export function BotaoLateral({ icon: Icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center lg:justify-start gap-4 px-0 lg:px-4 py-3 rounded-xl transition-all duration-200 group relative
        ${isActive 
          ? 'bg-brand-yellow text-brand-black shadow-lg font-bold' 
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        }`}
    >
      <Icon size={24} className={isActive ? 'stroke-2' : 'stroke-1'} />
      
      <span className="hidden lg:block text-sm">{label}</span>
      
      <span className="absolute left-16 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 lg:group-hover:opacity-0 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-md">
        {label}
      </span>
    </button>
  );
}