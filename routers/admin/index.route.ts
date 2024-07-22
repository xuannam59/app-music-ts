import { Express } from "express"
import { systemConfig } from "../../config/system";

import { dashboardRouter } from "./dashboard.route";
import { topicsRouter } from "./topic";


const adminRoute = (app: Express) => {
  const prefixAdmin = systemConfig.prefixAdmin;
  app.use(`/${prefixAdmin}/dashboard`, dashboardRouter);

  app.use(`/${prefixAdmin}/topics`, topicsRouter);
}

export default adminRoute;