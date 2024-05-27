import express from "express";
import * as imageController from "../controllers/imageController";

const router = express.Router();

router.get("/:post_id", imageController.getFileById);

export default router;
