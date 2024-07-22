import { Express } from "express";

import { topicRouter } from "./topic.route";
import { songRouter } from "./songs.route";
import { searchRoute } from "./search.route";

const clientRoute = (app: Express) => {

  app.use("/topics", topicRouter);

  app.use("/songs", songRouter);

  app.use("/search", searchRoute);

}

export default clientRoute;
