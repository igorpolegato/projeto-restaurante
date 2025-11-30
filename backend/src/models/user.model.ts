import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelizeModel } from ".";

export interface UserAttributes {
    id: number;
    name: string;
    login: string;
    password: string;
    type: string;
}

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements UserAttributes {
    declare id: CreationOptional<number>
    declare name: string
    declare login: string
    declare password: string
    declare type: string
}

User.init(
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
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeModel,
        tableName: "tb_user",
        timestamps: false,
        underscored: true
    }
)

export default User;
