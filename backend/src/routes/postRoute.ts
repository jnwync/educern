import express from "express";
import * as postController from "../controllers/postController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/multer";

const router = express.Router();

router.get("/", authenticateJWT, postController.getAllPosts);
router.get("/:id", authenticateJWT, postController.getPostById);
router.post("/", postController.createPost);
router.put("/:id", authenticateJWT, postController.updatePost);
router.delete("/:id", authenticateJWT, postController.deletePost);
router.post("/posts", upload.array("images", 3), postController.createPost);

export default router;
