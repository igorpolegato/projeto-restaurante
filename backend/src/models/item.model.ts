import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelizeModel } from ".";

export interface ItemAttributes {
    id: number;
    name: string;
    price: number;
    description?: string;
    image?: string;
}

export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> implements ItemAttributes {
    declare id: CreationOptional<number>
    declare name: string;
    declare price: number;
    declare description?: string;
    declare image?: string;
}

Item.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.00
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: sequelizeModel,
        tableName: "tb_item",
        timestamps: false,
        underscored: true,
    }
)

export default Item;
