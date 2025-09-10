import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { BranchProduct } from "../models/ProductBranch";
import { Role } from "../models/Role";
import { User } from "../models/User";
import { Branch } from "../models/Branch";
import { Location } from "../models/Location";
import { Schedule } from "../models/Schedule";
import { Banner } from "../models/Banner";
import { Sections } from "../models/Sections";
import { Tag } from "../models/Tag";
import { Contact } from "../models/Contact";

dotenv.config();

const PORT = Number(process.env.DB_PORT);

export const db = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    Category,
    Product,
    BranchProduct,
    Role,
    User,
    Branch,
    Location,
    Schedule,
    Banner,
    Sections,
    Tag,
    Contact
  ],
  synchronize: true,
  logging: false,
});