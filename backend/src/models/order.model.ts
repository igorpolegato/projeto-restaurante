import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelizeModel } from ".";

export interface CustomerAttributes {
    id: number;
    id_customer: number;
    status: string;
}

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> implements CustomerAttributes {
    declare id: CreationOptional<number>
    declare id_customer: number
    declare status: string;
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_customer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeModel,
        tableName: "tb_order",
    }
)

export default Order;
