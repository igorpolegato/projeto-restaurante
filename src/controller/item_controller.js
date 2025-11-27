// src/controllers/item.controller.js

// Importa os dados mocados (ajuste o caminho se necessário)
import { products, categories } from "../data/db.js";

// 1. Controlador para retornar todos os produtos
export const getAllProducts = (req, res) => {
  try {
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar produtos." });
  }
};

// 2. Controlador para retornar categorias
export const getAllCategories = (req, res) => {
  try {
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar categorias." });
  }
};

// 3. Controlador para retornar produtos por categoria
export const getProductsByCategory = (req, res) => {
  const { categoryId } = req.params;

  const filteredProducts = products.filter(
    (product) => product.category === categoryId
  );

  if (filteredProducts.length === 0) {
    return res
      .status(404)
      .send({
        message: `Nenhum produto encontrado na categoria: ${categoryId}`,
      });
  }

  return res.status(200).json(filteredProducts);
};
