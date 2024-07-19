import { Router } from "express";
import * as controller from "../../controllers/client/songs.controller";

const router: Router = Router();

router.get("/:slugTopic", controller.list);

router.get("/detail/:slugSong", controller.detail);

router.patch("/detail/like/:typeLike/:id", controller.like);

router.patch("/detail/favorite/:typeFavorit/:id", controller.favoritePatch);

router.get("/favorite/music", controller.favorite);

router.patch("/listen/:songId", controller.listen);



export const songRouter = router;