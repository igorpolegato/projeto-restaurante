import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelizeModel } from ".";

export interface CategoryItemAttributes {
    id: number;
    id_category: number;
    id_item: number;
}

export class CategoryItem extends Model<InferAttributes<CategoryItem>, InferCreationAttributes<CategoryItem>> implements CategoryItemAttributes {
    declare id: CreationOptional<number>
    declare id_category: number
    declare id_item: number
}

CategoryItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_category: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "tb_category",
                key: "id",
            },

        },
        id_item: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "tb_item",
                key: "id",
            },
        },
    },
    {
        sequelize: sequelizeModel,
        tableName: "tb_category_item",
        timestamps: false,
        underscored: true,
    }
)

export default CategoryItem;
