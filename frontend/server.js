import express from "express";

// 1. Correção: Usar 'import' para módulos locais e incluir a extensão .js
import itemRoutes from "./src/routes/item_route.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para que o Express entenda JSON no corpo das requisições (POST/PUT)
app.use(express.json());

// 2. Usar as rotas no caminho base /items
// Todas as rotas definidas em item.routes.js serão acessíveis através de /items/...
app.use("/api/items", itemRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor rodando! Acesse /items/products");
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
