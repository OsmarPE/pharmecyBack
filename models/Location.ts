import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, BaseEntity } from "typeorm";
import { Branch } from "./Branch";

@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ name: "between_street" })
  betweenStreet: string;

  @Column({name : "and_between_street"})
  andBetweenStreet: string;

  @Column()
  zipCode: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  colony: string;
  
  @Column({ type: "double" })
  latitude: number;

  @Column({ type: "double" })
  longitude: number;

  @OneToOne(() => Branch,{onDelete: "CASCADE", onUpdate: "CASCADE"})
  @JoinColumn()
  branch: Branch;
}
