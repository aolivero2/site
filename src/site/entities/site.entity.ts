import { table } from "console";
import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Site extends Model{
    @Column
    name: string;

    @Column
    address: string;

    @Column
    neighborhood: string;
}
