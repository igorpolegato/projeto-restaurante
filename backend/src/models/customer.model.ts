import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelizeModel } from ".";

export interface CustomerAttributes {
    id: number;
    name: string;
}

export class Customer extends Model<InferAttributes<Customer>, InferCreationAttributes<Customer>> implements CustomerAttributes {
    declare id: CreationOptional<number>
    declare name: string;
}

Customer.init(
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
        tableName: "tb_customer",
    }
)

export default Customer;
