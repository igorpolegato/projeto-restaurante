import { useState } from "react";
import { Flame } from "lucide-react";

// Componentes
import { Header } from "./components/layout/Header";
import { BarraLateral } from "./components/layout/BarraLateral";
import { BarraInferior } from "./components/layout/BarraInferior";
import { CardProduto } from "./components/produto/CardProduto";
import { BannerPromocional } from "./components/ui/BannerPromocional";
import { BuscaMobile } from "./components/ui/BuscaMobile";
import { Carrinho } from "./components/ui/Carrinho";
import { ModalDetalhes } from "./components/ui/ModalDetalhes";
import { ModalConfirmacao } from "./components/ui/ModalConfirmacao";

// Dados
import { categories, products } from "./data/db";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // --- LÓGICA DE FILTRO ---
  const filteredProducts =
    activeTab === "home"
      ? products
      : products.filter((product) => product.category === activeTab);

  // --- LÓGICA DO CARRINHO ---
  const handleAddToCart = (product, quantity = 1, observation = "") => {
    setCart((prevCart) => {
      // Verifica se o item já existe no carrinho (pelo ID)
      // Nota: Num sistema real com observações diferentes, a verificação deveria considerar ID + Observação
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

  const handleConfirmOrder = () => {
    console.log("Pedido Enviado:", cart);

    setCart([]);
    setIsConfirmOpen(false);

    alert("Pedido enviado para a cozinha! 👨‍🍳");
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-brand-gray font-sans text-brand-black overflow-hidden">

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

      {/* Layout Principal */}
      <BarraLateral
        categories={categories}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex-1 flex flex-col h-full relative w-full">
        <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 bg-brand-gray scroll-smooth">
          <BuscaMobile />

          {/* Banner só aparece na Home */}
          {activeTab === "home" && <BannerPromocional />}

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2 capitalize">
                <Flame
                  className="text-brand-yellow fill-brand-yellow"
                  size={20}
                />
                {activeTab === "home" ? "Cardápio Completo" : activeTab}
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
        </main>

        <BarraInferior
          categories={categories}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
}
