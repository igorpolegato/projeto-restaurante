import { Router } from "express";

const UserRoutes = Router();

UserRoutes.post("/register", (req, res) => {
    // Registration logic here
    res.send("User registered");
});

export default UserRoutes;
