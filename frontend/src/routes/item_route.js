import express from "express";
// Certifique-se de incluir a extensão .js ao importar o Controller
import * as itemController from "../controller/item_controller.js";

// Express.Router precisa ser importado e inicializado
const router = express.Router();

// Exemplo: Rota GET /items/products
router.get("/products", itemController.getAllProducts);

// Exemplo: Rota GET /items/categories
router.get("/categories", itemController.getAllCategories);

// Rota GET /items/by-category/:categoryId
router.get("/by-category/:categoryId", itemController.getProductsByCategory);

// Usar 'export default' no lugar de module.exports
export default router;
