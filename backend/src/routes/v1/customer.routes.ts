import { Router } from "express";
import Customer from "../../models/customer.model";

const CustomerRoutes = Router();

CustomerRoutes.post("/new", async (req, res) => {
    const { name } = req.body;

    try {
        const customer = await Customer.create({
            name: String(name)
        })


        res.success("Customer created successfully", {customer: customer});
    }

    catch (error) {
        res.error("Failed to create customer", {error: error});
    }   

});

CustomerRoutes.get("/:id", (req, res) => {
    // Customer retrieval logic here
    res.send(`Customer details for ID: ${req.params.id}`);
});

CustomerRoutes.get("/", (req, res) => {
    // Customer listing logic here
    res.send("List of customers");
});



export default CustomerRoutes;
