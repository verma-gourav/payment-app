import mongoose, { Schema, Types } from "mongoose";
import type { IAccount } from "./Account.js";

export enum TransactionType {
  CREDIT = "credit",
  DEBIT = "debit",
}

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface ITransactions extends Document {
  fromAccount: Types.ObjectId | IAccount;
  toAccount: Types.ObjectId | IAccount;
  amountInCents: number; // integer
  type: TransactionType;
  status: TransactionStatus;
  timestamp: Date;
}

const TransactionSchema: Schema<ITransactions> = new mongoose.Schema({
  fromAccount: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  toAccount: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  amountInCents: { type: Number, required: true },
  type: { type: String, enum: Object.values(TransactionType), required: true },
  status: {
    type: String,
    enum: Object.values(TransactionStatus),
    default: TransactionStatus.PENDING,
  },
  timestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.model<ITransactions>(
  "Transaction",
  TransactionSchema
);

export default Transaction;
