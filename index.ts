import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import routeClient from "./routers/client/index.route";

dotenv.config();

database.connect();

const app: Express = express();
const port: number | string = process.env.PROT || 3000;

// File static
app.use(express.static('public'));

// View Pug
app.set('views', './views');
app.set('view engine', 'pug');

// Router Client
routeClient(app);

app.listen(port, () => {
  console.log(`App listener port on ${port}`);
})