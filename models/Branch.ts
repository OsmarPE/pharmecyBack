import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, BaseEntity } from "typeorm";
import { Schedule } from "./Schedule";
import { Contact } from "./Contact";
import { Location } from "./Location";
import { BranchProduct } from "./ProductBranch";

@Entity()
export class Branch extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Schedule, (schedule) => schedule.branch,{ cascade: true })
  schedule: Schedule[];

  @OneToMany(() => Contact, (contact) => contact.branch, { cascade: true })
  contact: Contact[];

  @OneToOne(() => Location, (location) => location.branch, { cascade: true })
  location: Location;

  @OneToMany(() => BranchProduct, (branchProduct) => branchProduct.branch)
  branchProducts: BranchProduct[];
  
}