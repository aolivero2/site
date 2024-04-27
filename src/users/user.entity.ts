import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @Column
    email: string;
}