import { Express } from "express";

import { topicRouter } from "./topic.route";
import { songRouter } from "./songs.route";

const routeClient = (app: Express) => {

  app.use("/topics", topicRouter);

  app.use("/songs", songRouter);

}

export default routeClient;
