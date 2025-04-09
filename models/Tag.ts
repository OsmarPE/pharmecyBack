import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, BaseEntity } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Product, (product) => product.tags)
  products: Product[];
}
