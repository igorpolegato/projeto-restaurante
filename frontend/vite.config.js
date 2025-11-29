import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Adicionando a configuração do servidor e do proxy
  server: {
    port: 5174, // Opcional, forçando a porta 5174 para o frontend
    proxy: {
      // Quando o frontend tentar acessar /api/..., o Vite encaminha para http://localhost:3000
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // Remove o prefixo /api antes de enviar para o Express,
        // pois suas rotas no Express são '/items' e não '/api/items'
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
