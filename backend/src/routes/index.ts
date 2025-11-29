import { Router } from "express";
import itemRoutes from "./v1/item.routes";

const router = Router();

router.use("/items", itemRoutes);

export default router;
