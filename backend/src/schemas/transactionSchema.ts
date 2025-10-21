import { z } from "zod";

export const createTransactionSchema = z.object({
  body: z.object({
    fromAccountId: z.string(),
    toAccountId: z.string(),
    amount: z
      .number()
      .positive()
      .gt(0, "Amount must be greater than 0")
      .refine((val) => Number.isInteger(val * 100), {
        message: "Amount must have at most two decimal places",
      }),
  }),
});
