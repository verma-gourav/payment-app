import Account from "../models/Account.js";
import Transaction, {
  TransactionStatus,
  TransactionType,
  type ITransactions,
} from "../models/Transaction.js";

const createTransaction = async (
  fromAccountId: string,
  toAccountId: string,
  amountInDecimal: number
) => {
  if (!Number.isInteger(amountInDecimal * 100)) {
    throw new Error("Amount must have at most two decimal places");
  }

  const amountInCents = Math.round(amountInDecimal * 100);

  const fromAcc = await Account.findById(fromAccountId);
  const toAcc = await Account.findById(toAccountId);

  if (!fromAcc || !toAcc) throw new Error("Account not found");
  if (fromAcc._id.equals(toAcc._id)) {
    throw new Error("Cannot send to own account");
  }
  if (fromAcc.balanceInCents < amountInCents) {
    throw new Error("Insufficient balance");
  }

  fromAcc.balanceInCents -= amountInCents;
  toAcc.balanceInCents += amountInCents;

  await Promise.all([fromAcc.save(), toAcc.save()]);

  const tx = await Transaction.create({
    fromAccount: fromAccountId,
    toAccount: toAccountId,
    amountInCents,
    type: TransactionType.DEBIT,
    status: TransactionStatus.COMPLETED,
  });

  return tx;
};

const getTransactions = async (accountId: string) => {
  const txs = await Transaction.find({
    $or: [{ fromAccount: accountId }, { toAccount: accountId }],
  })
    .sort({ timestamp: -1 })
    .lean()
    .exec();

  return txs.map((tx) => {
    const type = tx.fromAccount.toString() === accountId ? "debit" : "credit";
    return {
      _id: tx._id,
      fromAccount: tx.fromAccount,
      toAccount: tx.toAccount,
      amount: tx.amountInCents / 100,
      status: tx.status,
      timestamp: tx.timestamp,
      type,
    };
  });
};

export default { createTransaction, getTransactions };
