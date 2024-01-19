import { DataSource } from "typeorm";
require('dotenv').config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_SEVER,
  port: parseInt(process.env.DB_HOST, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [], // Substitua isso com os caminhos corretos para suas entidades DB_NAME=nobaiwyk
  synchronize: true,
})
