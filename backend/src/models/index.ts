import { Sequelize, Dialect } from "sequelize"
import { ENV } from "../configs/dotenv.config"

export const sequelizeModel = new Sequelize(
    ENV.DB.NAME as string,
    ENV.DB.USER as string,
    ENV.DB.PASS as string,
    {
        host: ENV.DB.HOST as string,
        port: ENV.DB.PORT as number,
        dialect: ENV.DB.DIALECT as Dialect,
        logging: false,
    }
)

export async function checkDatabaseConnection() {
    try {
        await sequelizeModel.authenticate()
        console.log("✅ Conexão com o banco estabelecida com sucesso")
    } catch (error) {
        console.error("❌ Erro ao conectar no banco:", error)
        process.exit(1)
    }
}
