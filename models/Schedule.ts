import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, BaseEntity } from "typeorm";
import { Branch } from "./Branch";

@Entity()
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:'time_in', type: 'time'})
  timeIn: string;

  @Column({name:'time_out', type: 'time'})
  timeOut: string;

  @Column({name:'day_to'})
  dayTo: string;

  @Column({name:'day_from'})
  dayFrom: string;

  @ManyToOne(() => Branch, (branch) => branch.schedule, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  branch: Branch;
}