import express from "express";
import * as postController from "../controllers/postController";

const router = express.Router();


router.get('/', postController.upvotePost)
router.put("/:id", postController.upvotePost);

export default router;