import { Router } from "express";
import * as controller from "../../controllers/admin/dashboard.controller";

const router: Router = Router();

router.get("/", controller.index);

export const dashboardRouter: Router = router;