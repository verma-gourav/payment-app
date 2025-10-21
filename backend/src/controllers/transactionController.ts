import type { Request, Response } from "express";
import transactionService from "../services/transactionService.js";

const createTransaction = async (req: Request, res: Response) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;
    const tx = await transactionService.createTransaction(
      fromAccountId,
      toAccountId,
      amount
    );

    res.status(201).json({
      message: "Transactions successfull",
      id: tx._id,
      fromAccount: tx.fromAccount,
      toAccount: tx.toAccount,
      amount: tx.amountInCents / 100, // amount in decimal just for response
      status: tx.status,
      timestamp: tx.timestamp,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getMyTransactions = async (req: Request, res: Response) => {
  try {
    const accountId = req.query.accountId as string;
    if (!accountId)
      return res.status(400).json({ message: "AccountId query required" });
    const list = await transactionService.getTransactions(accountId);
    res.json(list);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default { createTransaction, getMyTransactions };
