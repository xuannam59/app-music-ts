import { Router } from "express";
import * as controller from "../../controllers/admin/songs.controller"

const router: Router = Router();

router.get("/", controller.index);

export const songsRouter: Router = router;