import { Router } from "express";
import * as controller from "../../controllers/client/songs.controller";

const router: Router = Router();

router.get("/:slugTopic", controller.list);

router.get("/detail/:slugSong", controller.detail);

router.patch("/detail/like/:typeLike/:id", controller.like);

router.get("/detail/favorite/:typeFavorit/:id", controller.favorite);

export const songRouter = router;