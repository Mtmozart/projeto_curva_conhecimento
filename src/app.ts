import express, { Response } from "express"
import router from "./routes";

const app = express();

app.use(express.json());
app.use(router);


app.get("/", (_, res: Response) => {
  res.send("Bem vindo ao projeto de cura de conhecimento!");
});


export default app;
