import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.DB_PORT);

export const db = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "pharmacy",
  entities: [__dirname + "/../models/**/*.ts"],
  synchronize: true,
  logging: false,
});