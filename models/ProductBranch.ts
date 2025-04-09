import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BaseEntity } from "typeorm";
import { Branch } from "./Branch";
import { Product } from "./Product";

@Entity()
export class BranchProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Branch, (branch) => branch.branchProducts)
  branch: Branch;

  @ManyToOne(() => Product, (product) => product.branchProducts)
  product: Product;

  @Column()
  amount: number;
}
