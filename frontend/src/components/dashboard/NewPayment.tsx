import { useState } from "react";
import Input from "../common/Input";
import { userApi } from "../../api/userApi";
import { transactionApi } from "../../api/transactionApi";
import Button from "../common/Button";

interface NewPaymentProps {
  profile: any;
  onSuccess: () => void;
}

const NewPayment = ({ profile, onSuccess }: NewPaymentProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await userApi.search(query);
      setSearchResults(res.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleSendMoney = async (recieverId: string) => {
    if (!amount) return alert("Enter amount");
    setLoading(true);
    try {
      await transactionApi.sendMoney({
        fromAccountId: profile.account._id,
        toAccountId: recieverId,
        amount: Number(amount),
      });
      setAmount("");
      setSearchTerm("");
      setSearchResults([]);
      onSuccess();
      alert("Payment Successful!");
    } catch (err: any) {
      console.log(err.response?.data?.message);
      alert("Error sending payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/4 flex justify-center mt-6 md:mt-10">
      <div className="w-full sm:w-[90%] h-[50vh] p-6 bg-light rounded-xl shadow-sm">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
          New Payment
        </h2>

        <Input
          label="Search user"
          placeholder="Enter username..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="mt-3"
        />

        <Input
          label="Amount"
          type="number"
          placeholder="Enter amount..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-3"
        />

        {searchResults.length > 0 && (
          <div className="mt-2 rounded-xl bg-white/10 max-h-40 overflow-y-auto">
            {searchResults.map((u) => (
              <div
                key={u.walletAccountId}
                className="p-2 hover:bg-white/20 cursor-pointer rounded-md"
                onClick={() => handleSendMoney(u.walletAccountId)}
              >
                @{u.username}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center items-center mt-8">
          <Button
            text="SEND"
            variant="primary"
            size="lg"
            onClick={() =>
              searchResults.length === 1
                ? handleSendMoney(searchResults[0].walletAccountId)
                : alert("Select a user to send")
            }
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default NewPayment;
