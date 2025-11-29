import { Sequelize, Dialect } from "sequelize"
import { ENV } from "../configs/dotenv.config"

export const sequelizeModel = new Sequelize(
    ENV.DB.NAME,
    ENV.DB.USER,
    ENV.DB.PASS,
    {
        host: ENV.DB.HOST,
        port: ENV.DB.PORT,
        dialect: ENV.DB.DIALECT as Dialect,
        logging: false,
    }
)
