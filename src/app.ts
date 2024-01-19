import express, { Response } from "express"
import router from "./routes";
import  "reflect-metadata";
import { AppDataSource } from "./config/dataSource";

const app = express();
app.use(express.json());
app.use(router);


AppDataSource.initialize().then(() => {
  console.log("Banco de dados conectados")
}).catch((err) => {console.log(err)})

export default app;