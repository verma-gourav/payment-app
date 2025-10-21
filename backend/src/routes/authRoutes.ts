import { Router } from "express";
import validate from "../middleware/validate.js";
import { signinSchema, signupSchema } from "../schemas/authSchema.js";
import authController from "../controllers/authController.js";

const router = Router();

router.post("/signup", validate(signupSchema), authController.signup);
router.post("/signin", validate(signinSchema), authController.signin);

export default router;
