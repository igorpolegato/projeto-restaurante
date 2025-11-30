import express from "express";
import v1Routes from "./routes";
import http from 'http';
import { ENV } from "./configs/dotenv.config";
import { responseFormatter } from "./services/responseFormatter";
import { checkDatabaseConnection } from "./models";

const app = express();
const port = ENV.PORT || 5000;

app.use(express.json());
app.use(responseFormatter);
app.use("/v1", v1Routes);

app.get("/", (req, res) => {
    res.send("Welcome to Restaurante API");
})

const server = http.createServer(app);

server.listen(port, async() => {
    await checkDatabaseConnection();
    console.log(`Server is running on http://localhost:${port}`);
});
