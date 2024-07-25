import { Router } from "express";
import multer from "multer";

import * as controller from "../../controllers/admin/upload.controller";
import * as cloudinary from "../../middleware/admin/uploadCloud.middleware";


const upload = multer();
const router: Router = Router();

router.post("/",
  upload.single("file"),
  cloudinary.uploadSingle,
  controller.upload
);

export const uploadRoute = router;