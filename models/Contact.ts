import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { Branch } from "./Branch";

@Entity()
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  number: string;

  @ManyToOne(() => Branch, (branch) => branch.contact,{onDelete: "CASCADE", onUpdate: "CASCADE"})
  branch: Branch;
}