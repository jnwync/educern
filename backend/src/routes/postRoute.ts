import express from "express";
import * as postController from "../controllers/postController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/multer";

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", upload.array("images", 3), postController.createPost);
router.put("/update", postController.updatePost); 
router.delete("/:id", postController.deletePost);
router.put("/upvote/:userId/:postId", postController.upvotePost);
router.get("/votes", postController.getVotes);

export default router;
