import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import * as database from "./config/database";
import clientRouter from "./routers/client/index.route";
import { systemConfig } from "./config/system";
import adminRoute from "./routers/admin/index.route";
import bodyParser from "body-parser";
import methodOverride from "method-override";

dotenv.config();

database.connect();

const app: Express = express();
const port: number | string = process.env.PROT || 3000;

// override with POST having ?_method="<METHOD>"
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// variable locals
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// File static
app.use(express.static(`${__dirname}/public`));

// View Pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// Router Client
clientRouter(app);

// Router Admin
adminRoute(app);

app.listen(port, () => {
  console.log(`App listener port on ${port}`);
})