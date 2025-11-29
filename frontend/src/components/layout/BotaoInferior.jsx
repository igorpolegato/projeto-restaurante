import React from "react";

export function BotaoInferior({ icon: Icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-end gap-1 p-1 rounded-lg transition-all w-full
        ${isActive ? "text-brand-black" : "text-gray-400"}`}
    >
      <div
        className={`p-1 rounded-xl transition-all duration-300 ease-out
          ${
            isActive
              ? "bg-brand-yellow -translate-y-3 shadow-md border-2 border-white"
              : "bg-transparent"
          }`}
      >
        <Icon size={22} className={isActive ? "stroke-2" : "stroke-1"} />
      </div>

      <span
        className={`text-[10px] font-medium transition-all duration-300
          ${isActive ? "font-bold translate-y-[-2px]" : ""}`}
      >
        {label}
      </span>
    </button>
  );
}
