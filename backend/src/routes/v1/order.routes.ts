import { Router } from "express";
import Order from "../../models/order.model";
import Customer from "../../models/customer.model";
import { sequelizeModel } from "../../models";
import OrderItem from "../../models/orderItem.model";

const OrderRoutes = Router();

OrderRoutes.post("/new", async (req, res) => {
    const transaction = await sequelizeModel.transaction();
    const { customer_id, items } = req.body;

    try {
        const customer = await Customer.findByPk(customer_id);

        if (!customer) {
            return res.error("Customer not found");
        }

        const order = await Order.create({
            id_customer: customer_id,
            status: "pending"
        }, { transaction });

        order.save({ transaction });

        for (const item of items) {
            await OrderItem.create({
                id_order: order.id,
                id_item: item.id,
                quantity: item.quantity
            }, { transaction });
        }

        await transaction.commit();
        res.success("Order created successfully", { order: order });
    }

    catch (error) {
        await transaction.rollback();
        console.log(error);
        res.error("Failed to create order", { error: error });
    }
});

OrderRoutes.get("/", (req, res) => {
    const orders = Order.findAll({
        limit: 10
    });

    res.success("success", { orders: orders });
});

OrderRoutes.get("/pendings", (req, res) => {
    const orders = Order.findAll({ where: { status: "pending" } });

    res.success("success", { orders: orders });
});


OrderRoutes.get("/customer", async (req, res) => {

    try {
        const orders = await Order.findAll({
            where: { id_customer: Number(req.query.customer) },
            include: ["items"]
        });
        res.success("success", { orders: orders });

    } catch (error) {
        console.log(error);
        res.error("Failed to retrieve orders for customer", { error: error });
    }
});

OrderRoutes.get("/:id", async (req, res) => {
    try {
        const order = await Order.findByPk(Number(req.params.id), {
            include: ["items"]
        });
        res.success("success", { order: order });

    }

    catch (error) {
        console.log(error);
        res.error("Failed to retrieve order", { error: error });
    }
});


export default OrderRoutes;
