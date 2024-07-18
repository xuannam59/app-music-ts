import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";

dotenv.config();

database.connect();

const app: Express = express();
const port: number | string = process.env.PROT || 3000;


app.get("/", (req, res) => {
  res.send("Ok");
})

app.listen(port, () => {
  console.log(`App listener port on${port}`);
})