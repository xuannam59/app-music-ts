import { Express } from "express"
import { dashboardRouter } from "./dashboard.route";
import { systemConfig } from "../../config/system";


const adminRoute = (app: Express) => {
  const prefixAdmin = systemConfig.prefixAdmin;
  app.use(`/${prefixAdmin}/dashboard`, dashboardRouter);
}

export default adminRoute;