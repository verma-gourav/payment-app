import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/me", authMiddleware, userController.getProfile);
router.put("/me", authMiddleware, userController.updateProfile);
router.get("/search", authMiddleware, userController.searchUser);

export default router;
