import { DataSource } from "typeorm";
import UserEntity from "../entities/UserEntity";
import SpacedRepetitionEntity from "../entities/SpacedRepetitionEntity";
import PermissionEntity from "../entities/PermissionsEntity";
import PermissionRulesEntity from "../entities/PermissionRulesEntity";
import RulesEntity from "../entities/RuleEntity";
require('dotenv').config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_SEVER,
  port: parseInt(process.env.DB_HOST, 10),
  url: process.env.DB_URL,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity, SpacedRepetitionEntity,PermissionRulesEntity, PermissionEntity, RulesEntity], // Substitua isso com os caminhos corretos para suas entidades DB_NAME=nobaiwyk
  synchronize: true,

 // logging: true,
})
