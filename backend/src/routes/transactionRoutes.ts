import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import { createTransactionSchema } from "../schemas/transactionSchema.js";
import transactionController from "../controllers/transactionController.js";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  validate(createTransactionSchema),
  transactionController.createTransaction
);

router.get(
  "/mytransactions",
  authMiddleware,
  transactionController.getMyTransactions
);

export default router;
