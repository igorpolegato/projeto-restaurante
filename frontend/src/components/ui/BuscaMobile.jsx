import React from 'react';
import { Search } from 'lucide-react';

export function BuscaMobile() {
  return (
    <div className="mb-6 relative md:hidden">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      <input 
        type="text" 
        placeholder="O que deseja pedir?" 
        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white shadow-sm border-none focus:ring-2 focus:ring-brand-yellow focus:outline-none"
      />
    </div>
  );
}