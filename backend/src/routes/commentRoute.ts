import express from "express";
import * as commentController from "../controllers/commentController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authenticateJWT, commentController.getAllComments);
router.get("/:id", authenticateJWT, commentController.getCommentById);
router.post("/", authenticateJWT, commentController.createComment);
router.put("/:id", authenticateJWT, commentController.updateComment);
router.delete("/:id", authenticateJWT, commentController.deleteComment);

export default router;
