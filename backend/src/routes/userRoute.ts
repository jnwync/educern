import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.loginUser)
router.get("/:email", userController.getUserByEmail)

export default router;
