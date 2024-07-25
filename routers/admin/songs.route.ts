import { Router } from "express";
import * as controller from "../../controllers/admin/songs.controller"
import multer from "multer";

import * as cloudinary from "../../middleware/admin/uploadCloud.middleware";

const upload = multer();

const router: Router = Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create",
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]), cloudinary.uploadMultip, controller.createPost);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id",
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]), cloudinary.uploadMultip, controller.editPost)

export const songsRouter: Router = router;