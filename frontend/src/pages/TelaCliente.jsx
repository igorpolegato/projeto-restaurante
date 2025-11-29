import { useState } from "react";
import { Flame, Clock } from "lucide-react";

// Componentes
import { Header } from "../components/layout/Header";
import { BarraLateral } from "../components/layout/BarraLateral";
import { BarraInferior } from "../components/layout/BarraInferior";
import { CardProduto } from "../components/produto/CardProduto";
import { BannerPromocional } from "../components/ui/BannerPromocional";
import { BuscaMobile } from "../components/ui/BuscaMobile";
import { Carrinho } from "../components/ui/Carrinho";
import { ModalDetalhes } from "../components/ui/ModalDetalhes";
import { ModalConfirmacao } from "../components/ui/ModalConfirmacao";
import { Identificacao } from "../components/ui/Identificacao";
import { MeusPedidos } from "../components/client/MeusPedidos";

// Dados e Serviços
import { categories, products } from "../data/db";
import { criarPedido } from "../services/pedidoService";

export function TelaCliente() {
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [sessionData, setSessionData] = useState(null);

  // Se não tiver sessão iniciada, mostra APENAS a tela de identificação
  if (!sessionData) {
    return <Identificacao onStart={(data) => setSessionData(data)} />;
  }

  // --- LÓGICA DE FILTRO ---
  const filteredProducts =
    activeTab === "home"
      ? products
      : products.filter((product) => product.category === activeTab);

  // --- LÓGICA DO CARRINHO ---
  const handleAddToCart = (product, quantity = 1, observation = "") => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity, observation }];
    });
  };

  const handleUpdateQuantity = (productId, amount) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      });
    });
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleRequestCheckout = () => {
    setIsCartOpen(false);
    setIsConfirmOpen(true);
  };

  const handleConfirmOrder = async () => {
    const novoPedido = {
      mesa: sessionData.mesa,
      cliente: sessionData.nome || `Mesa ${sessionData.mesa}`,
      itens: cart,
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };

    // 1. Salva no "Backend" (Service)
    await criarPedido(novoPedido);

    // 2. Limpa o carrinho e fecha modais
    setCart([]);
    setIsConfirmOpen(false);

    // 3. Redireciona o utilizador para a aba de acompanhamento
    setActiveTab("meus_pedidos");
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-brand-gray font-sans text-brand-black overflow-hidden">
      {/* Modais */}
      <ModalConfirmacao
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setIsCartOpen(true);
        }}
        onConfirm={handleConfirmOrder}
        cartItems={cart}
      />
      <Carrinho
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleRequestCheckout}
      />
      <ModalDetalhes
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Layout */}
      <BarraLateral
        // Adicionamos manualmente a opção "Meus Pedidos" aqui se não existir no DB
        categories={[
          ...categories,
          { id: "meus_pedidos", label: "Meus Pedidos", icon: Clock },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex-1 flex flex-col h-full relative w-full">
        {/* --- ATUALIZAÇÃO: Passando o nome do cliente --- */}
        <Header
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          clientName={sessionData.nome}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 bg-brand-gray scroll-smooth">
          {/* --- RENDERIZAÇÃO CONDICIONAL DA NOVA TELA --- */}
          {activeTab === "meus_pedidos" ? (
            <MeusPedidos mesa={sessionData.mesa} />
          ) : (
            /* --- CONTEÚDO PADRÃO DO CARDÁPIO --- */
            <>
              <BuscaMobile />
              {activeTab === "home" && (
                <div className="mb-4 bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center md:hidden">
                  <span className="text-sm text-gray-500 font-bold uppercase tracking-wide font-sans">
                    Mesa {sessionData.mesa}
                  </span>
                  <span className="text-sm font-bold text-brand-black font-montserrat">
                    {sessionData.nome || "Cliente"}
                  </span>
                </div>
              )}
              {activeTab === "home" && <BannerPromocional />}

              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-lobster text-brand-black flex items-center gap-2 capitalize tracking-wide">
                    <Flame
                      className="text-brand-yellow fill-brand-yellow"
                      size={24}
                    />
                    {activeTab === "home" ? "Cardápio da Casa" : activeTab}
                  </h2>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    <p>Nenhum item encontrado nesta categoria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {filteredProducts.map((product) => (
                      <CardProduto
                        key={product.id}
                        product={product}
                        onAdd={() => handleAddToCart(product)}
                        onClick={() => setSelectedProduct(product)}
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </main>

        <BarraInferior
          // Adiciona 'Meus Pedidos' na barra inferior
          categories={[
            ...categories.slice(0, 4),
            { id: "meus_pedidos", label: "Pedidos", icon: Clock },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
}
