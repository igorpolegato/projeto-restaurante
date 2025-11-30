import { Router } from "express";
import Item from "../../models/item.model";
import CategoryItem from "../../models/categoyItem.model";
import { sequelizeModel } from "../../models";

const itemRoutes = Router();

itemRoutes.post("/new", async (req, res) => {
    const { name, price, description, image, categories } = req.body;
    const transaction = await sequelizeModel.transaction();

    try {
        const newItem = await Item.create({
            name: name,
            price: price,
            description: description,
            image: image
        }, { transaction });

        for (const categoryId of categories) {
            await CategoryItem.create({
                id_item: newItem.id,
                id_category: categoryId
            }, { transaction });
        }

        await transaction.commit();

        res.success("Item created successfully", { item: newItem });

    } catch (error) {
        await transaction.rollback();
        res.error("Failed to create item");
    }
});

itemRoutes.get("/:id", async (req, res) => {
    const item = await Item.findByPk(Number(req.params.id), {
        include: ["categories"]
    });

    res.success("success", { item: item });
});

itemRoutes.get("/", async (req, res) => {
    const items = await Item.findAll({
        include: ["categories"]
    });

    res.success("success", { items: items });
});

export default itemRoutes;
