import { Router } from "express";

import * as controller from "../../controllers/client/topics.controller";

const router: Router = Router();

router.get("/", controller.index);

export const topicRouter = router;