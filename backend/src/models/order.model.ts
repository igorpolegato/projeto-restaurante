import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelizeModel } from ".";

import Item from "./item.model";
import OrderItem from "./orderItem.model";

export interface CustomerAttributes {
    id: number;
    id_customer: number;
    status: string;
}

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> implements CustomerAttributes {
    declare id: CreationOptional<number>
    declare id_customer: number
    declare status: string;

    declare getItems: () => Promise<Item[]>;
    declare setItems: (Items: Item[] | number[], options?: any) => Promise<void>;
    declare addItem: (Item: Item | number) => Promise<void>;
    declare addItems: (Items: Item[] | number[]) => Promise<void>;
    declare removeItem: (Item: Item | number) => Promise<void>;
    declare removeItems: (Items: Item[] | number[]) => Promise<void>;
    declare hasItem: (Item: Item | number) => Promise<boolean>;
    declare hasItems: (Items: Item[] | number[]) => Promise<boolean>;
    declare countItems: () => Promise<number>;
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
        timestamps: false,
        underscored: true
    }
)

Order.belongsToMany(Item, {
    through: OrderItem,
    foreignKey: "id_order",
    as: "items"
});

Item.belongsToMany(Order, {
    through: OrderItem,
    foreignKey: "id_item",
    as: "orders"
});


export default Order;
