import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, BaseEntity } from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { BranchProduct } from "./ProductBranch";

@Entity()
export class Product  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2, name: "price_base" })
  priceBase: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true, name: "price_discount" })
  priceDiscount: number;

  @Column({ unique: true })
  sku: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column()
  image: string;

  @ManyToMany(() => Tag, (tag) => tag.products, { cascade: ['remove','update'] })
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => BranchProduct, (branchProduct) => branchProduct.product)
  branchProducts: BranchProduct[];
}
