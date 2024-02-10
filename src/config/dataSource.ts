import { DataSource } from "typeorm";
import UserEntity from "../entities/UserEntity";

require('dotenv').config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_SEVER,
  port: parseInt(process.env.DB_HOST, 10),
  url: process.env.DB_URL,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
 // entities: [UserEntity, SpacedRepetitionEntity,PermissionRulesEntity, PermissionEntity, RulesEntity],
 entities: [UserEntity],
 synchronize: true,

 // logging: true,
})
