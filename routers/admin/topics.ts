import { Router } from "express";
import * as controller from "../../controllers/admin/topics.controller";


const router: Router = Router();

router.get("/", controller.index);

export const topicsRouter: Router = router;

