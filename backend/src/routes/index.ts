import { Router } from "express";
import itemRoutes from "./v1/item.routes";
import customerRoutes from "./v1/customer.routes";
import orderRoutes from "./v1/order.routes";
import CategoryRoutes from "./v1/category.routes";
const router = Router();

router.use("/items", itemRoutes);
router.use("/customers", customerRoutes);
router.use("/orders", orderRoutes);
router.use("/categories", CategoryRoutes);

export default router;
