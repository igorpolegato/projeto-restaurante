import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelizeModel } from ".";

import Item from "./item.model";
import CategoryItem from "./categoyItem.model";

export interface CategoryAttributes {
    id: number;
    name: string;
}

export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> implements CategoryAttributes {
    declare id: CreationOptional<number>
    declare name: string;
}

Category.init(
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
        tableName: "tb_category",
        timestamps: false,
        underscored: true,
    }
)

Category.belongsToMany(Item, {
    through: CategoryItem,
    foreignKey: "id_category",
    as: "items"
});

Item.belongsToMany(Category, {
    through: CategoryItem,
    foreignKey: "id_item",
    as: "categories"
});

export default Category;
