import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelizeModel } from ".";

export interface ItemAttributes {
    id: number;
    name: string;
}

export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> implements ItemAttributes {
    declare id: CreationOptional<number>
    declare name: string;
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
        },
    },
    {
        sequelize: sequelizeModel,
        tableName: "tb_item",
    }
)

export default Item;
