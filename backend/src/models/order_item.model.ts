import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelizeModel } from ".";

export interface OrderItemAttributes {
    id: number;
    id_order: number;
    id_item: number;
    quantity: number;
}

export class OrderItem extends Model<InferAttributes<OrderItem>, InferCreationAttributes<OrderItem>> implements OrderItemAttributes {
    declare id: CreationOptional<number>
    declare id_order: number
    declare id_item: number
    declare quantity: number
}

OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_item: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeModel,
        tableName: "tb_order_item",
    }
)

export default OrderItem;
