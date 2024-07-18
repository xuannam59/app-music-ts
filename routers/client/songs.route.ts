import { Router } from "express";
import * as controller from "../../controllers/client/songs.controller";

const router: Router = Router();

router.get("/:slugTopic", controller.list);


export const songRouter = router;