import { Router } from "express";
import Category from "../../models/category.model";
const CategoryRoutes = Router();

CategoryRoutes.post("/new", async (req, res) => {
    const name = req.body.name;

    try {
        const newCategory = await Category.create({
            name: name
        });

        res.success("Category created successfully", {category: newCategory});

    } catch (error) {
        console.log(error)
        res.error("Failed to create category", {error: error});
    }

})

CategoryRoutes.get("/", async (req, res) => {
    const categories = await Category.findAll();
    res.success("success", categories);
});

CategoryRoutes.get("/items", async (req, res) => {
    const category = await Category.findByPk(Number(req.query.category), {
        include: ["items"]
    });

    res.success("success", category);
});

export default CategoryRoutes;
