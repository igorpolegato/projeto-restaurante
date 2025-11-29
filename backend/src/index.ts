import express from "express";
import v1Routes from "./routes";
import http from 'http';

const app = express();
const port = 5000;

app.use(express.json());
app.use("/v1", v1Routes);

app.get("/", (req, res) => {
    res.send("Welcome to Restaurante API");
})

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
