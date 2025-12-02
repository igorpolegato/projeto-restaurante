import express from "express";
import v1Routes from "./routes";
import http from 'http';
import { ENV } from "./configs/dotenv.config";
import { responseFormatter } from "./services/responseFormatter";
import { checkDatabaseConnection } from "./models";
import setupSwagger from "./swagger";

import cors, { CorsOptions } from 'cors'

const corsOptions: CorsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5174',
    'https://quiosque.igorpolegato.com.br'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

const app = express();
const port = ENV.PORT || 5000;

app.use(express.json());
app.use(responseFormatter);
app.use(cors(corsOptions))

setupSwagger(app);

app.use("/v1", v1Routes);

app.get("/", (req, res) => {
    res.send("Welcome to Restaurante API");
})

const server = http.createServer(app);

server.listen(port, async() => {
    await checkDatabaseConnection();
    console.log(`Server is running on http://localhost:${port}`);
});
