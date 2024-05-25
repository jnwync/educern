import express from "express";
import * as userController from "../controllers/userController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", authenticateJWT, userController.updateUser);
router.delete("/:id", authenticateJWT, userController.deleteUser);
router.post("/login", userController.loginUser);
router.get("/:email", authenticateJWT, userController.getUserByEmail);

export default router;
