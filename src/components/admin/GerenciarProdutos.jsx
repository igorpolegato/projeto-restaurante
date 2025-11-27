import React, { useState } from "react";
import { Plus, Pencil, Trash2, X, Search, Image as ImageIcon, Save } from "lucide-react";
import { categories, products as initialProducts } from "../../data/db";

export function GerenciarProdutos() {
  // --- ESTADOS ---
  const [itens, setItens] = useState(initialProducts); // Lista de produtos
  const [searchTerm, setSearchTerm] = useState(""); // Busca
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do Modal
  const [isEditing, setIsEditing] = useState(false); // Estamos editando ou criando?
  
  // Estado do Formulário
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    category: "lanches", // Valor padrão
    image: "",
  });

  // --- FILTROS ---
  const filteredItens = itens.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- AÇÕES CRUD ---

  // 1. Abrir Modal para CRIAR
  const handleOpenCreate = () => {
    setIsEditing(false);
    setFormData({ id: null, name: "", description: "", price: "", category: "lanches", image: "" });
    setIsModalOpen(true);
  };

  // 2. Abrir Modal para EDITAR
  const handleOpenEdit = (item) => {
    setIsEditing(true);
    setFormData(item); // Preenche o formulário com os dados do item
    setIsModalOpen(true);
  };

  // 3. DELETAR Item
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      setItens(itens.filter((item) => item.id !== id));
    }
  };

  // 4. SALVAR (Criar ou Editar)
  const handleSave = (e) => {
    e.preventDefault();

    // Validação Simples
    if (!formData.name || !formData.price || !formData.category) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    if (isEditing) {
      // Lógica de Atualização
      setItens(itens.map((item) => (item.id === formData.id ? formData : item)));
    } else {
      // Lógica de Criação
      const newItem = {
        ...formData,
        id: Date.now(), // Gera um ID único falso baseado no tempo
        price: parseFloat(formData.price), // Garante que seja número
      };
      setItens([...itens, newItem]);
    }

    setIsModalOpen(false);
  };

  // --- RENDERIZAÇÃO ---
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      
      {/* CABEÇALHO DA SEÇÃO */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold font-montserrat text-slate-800">Cardápio</h2>
          <p className="text-slate-500 text-sm">Gerencie os itens disponíveis para os clientes</p>
        </div>
        
        <button 
          onClick={handleOpenCreate}
          className="bg-brand-yellow text-slate-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-yellow-400 transition-colors"
        >
          <Plus size={20} />
          Novo Item
        </button>
      </div>

      {/* BARRA DE BUSCA */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Buscar item por nome..." 
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABELA DE PRODUTOS */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 text-sm">
              <th className="py-3 px-4 font-medium">Item</th>
              <th className="py-3 px-4 font-medium">Categoria</th>
              <th className="py-3 px-4 font-medium">Preço</th>
              <th className="py-3 px-4 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredItens.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                    {item.image && item.image.startsWith('/') ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon size={16} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{item.name}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">{item.description}</p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold uppercase">
                    {item.category}
                  </span>
                </td>
                <td className="py-3 px-4 font-montserrat font-bold text-slate-800">
                  R$ {item.price.toString().replace('.', ',')}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleOpenEdit(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredItens.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Nenhum item encontrado.
          </div>
        )}
      </div>

      {/* --- MODAL DE FORMULÁRIO --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                {isEditing ? "Editar Produto" : "Novo Produto"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Item *</label>
                <input 
                  type="text" 
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-yellow outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$) *</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-yellow outline-none"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
                  <select 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-yellow outline-none bg-white"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.filter(c => c.id !== 'home').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea 
                  rows="3"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-yellow outline-none resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                <input 
                  type="text" 
                  placeholder="/produtos/exemplo.jpg"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-yellow outline-none"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
                <p className="text-xs text-gray-400 mt-1">Use imagens da pasta /public/produtos/</p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 flex items-center gap-2"
                >
                  <Save size={18} />
                  Salvar Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}