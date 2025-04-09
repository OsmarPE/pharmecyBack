
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { User } from "./User";

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}