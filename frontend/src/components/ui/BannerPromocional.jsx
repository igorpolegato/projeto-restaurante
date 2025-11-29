import React from "react";

export function BannerPromocional() {
  return (
    <section className="mb-8 rounded-2xl overflow-hidden shadow-lg relative h-48 md:h-64 bg-brand-black group transition-all">
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>

      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546622662-66c3d8c7d1c6?q=80&w=2069')] bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-700"></div>

      <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-10 text-white">
        <span className="bg-brand-yellow text-brand-black text-[10px] font-bold px-2 py-1 rounded md:rounded-full w-fit mb-2 uppercase">
          Destaque
        </span>
        <h2 className="text-4xl md:text-6xl font-lobster text-white mb-2 leading-none shadow-black drop-shadow-lg">
          Combo <br />
          Pé na Areia
        </h2>
        <button className="mt-4 bg-brand-yellow text-brand-black px-6 py-2 rounded-full text-sm font-montserrat font-bold uppercase tracking-wide w-fit shadow-lg hover:bg-white transition-colors">
          Ver Oferta
        </button>
      </div>
    </section>
  );
}
