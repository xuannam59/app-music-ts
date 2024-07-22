import { Express } from "express"
import { systemConfig } from "../../config/system";

import { dashboardRouter } from "./dashboard.route";
import { topicsRouter } from "./topics";
import { songsRouter } from "./songs.route";


const adminRoute = (app: Express) => {
  const prefixAdmin = systemConfig.prefixAdmin;
  app.use(`/${prefixAdmin}/dashboard`, dashboardRouter);

  app.use(`/${prefixAdmin}/topics`, topicsRouter);

  app.use(`/${prefixAdmin}/songs`, songsRouter);
}

export default adminRoute;