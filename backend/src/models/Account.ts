import mongoose, { Schema, Types } from "mongoose";
import type { IUser } from "./User.js";

export enum AccountType {
  WALLET = "wallet",
  BANK = "bank",
}

export interface IAccount extends Document {
  user: Types.ObjectId | IUser;
  balanceInCents: number; // using integers for balance (9.99 -> 999)
  type: AccountType;
}

const AccountSchema: Schema<IAccount> = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  balanceInCents: { type: Number, default: 0 },
  type: {
    type: String,
    enum: Object.values(AccountType),
    default: AccountType.WALLET,
  },
});

const Account = mongoose.model<IAccount>("Account", AccountSchema);

export default Account;
