interface WalletProps {
  profile: any;
  transactions: any[];
}

const Wallet = ({ profile, transactions }: WalletProps) => {
  const sentTotal = transactions
    .filter((tx) => tx.type === "debit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const receivedTotal = transactions
    .filter((tx) => tx.type === "credit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="w-full md:w-3/5 p-4 md:p-10 flex flex-col">
      <h1 className="text-2xl md:text-4xl font-semibold text-start mb-2">
        Wallet Account
      </h1>

      <div className="p-1 rounded-xl mt-2 mb-4">
        <p className="text-lg md:text-xl text-gray-500">
          Balance:{" "}
          <span className="font-semibold text-primary">
            ${profile.account.balance}
          </span>
        </p>

        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
          <div className="bg-light w-full sm:w-40 h-20 text-lg rounded-xl text-gray-500 font-semibold flex justify-center items-center">
            Sent:{" "}
            <span className="text-red-400 ml-1">${sentTotal.toFixed(2)}</span>
          </div>
          <div className="bg-light w-full sm:w-40 h-20 text-lg rounded-xl text-gray-500 font-semibold flex justify-center items-center">
            Received:
            <span className="text-green-400 ml-1">
              ${receivedTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <h3 className="text-lg md:text-xl text-gray-700 font-semibold mb-2">
        Transactions
      </h3>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px] pr-2">
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <div
              key={tx._id}
              className="bg-light p-3 rounded-md flex justify-between items-center text-sm md:text-base"
            >
              <div>
                <p className="font-medium text-primary">{tx.toAccount}</p>
                <p className="text-xs text-gray-400">
                  {new Date(tx.timestamp).toLocaleString()}
                </p>
              </div>
              <p
                className={`font-semibold ${
                  tx.type === "credit" ? "text-green-400" : "text-red-400"
                }`}
              >
                {tx.type === "credit" ? "+" : "-"}${tx.amount}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">No transactions yet</p>
        )}
      </div>
    </div>
  );
};

export default Wallet;
