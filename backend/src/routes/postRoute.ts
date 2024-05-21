import express from "express";
import * as postController from "../controllers/postController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import multer from "multer";

const upload = multer({ dest: "/backend/src/images" });

const router = express.Router();

router.get("/", authenticateJWT, postController.getAllPosts);
router.get("/:id", authenticateJWT, postController.getPostById);
router.post("/", postController.createPost);
router.put("/:id", authenticateJWT, postController.updatePost);
router.delete("/:id", authenticateJWT, postController.deletePost);
router.post("/posts", upload.single("image"), postController.createPost);

export default router;
