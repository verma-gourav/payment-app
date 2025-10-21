import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { userApi } from "../api/userApi";
import Sidebar from "../components/dashboard/Sidebar";
import Wallet from "../components/dashboard/Wallet";
import { transactionApi } from "../api/transactionApi";
import NewPayment from "../components/dashboard/NewPayment";

const DashboardPage = () => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      // Fetch profile first
      const profileRes = await userApi.profile();
      const profileData = profileRes.data;
      setProfile(profileData);

      // Fetch transactions using account ID
      if (profileData.account?._id) {
        const txRes = await transactionApi.list(profileData.account._id);
        setTransactions(txRes.data);
      }
    } catch (err: any) {
      console.error(err);
      // if (err.response?.status === 401) logout();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!profile) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <Sidebar profile={profile} onLogout={logout} />
      <Wallet profile={profile} transactions={transactions} />
      <NewPayment profile={profile} onSuccess={fetchData} />
    </div>
  );
};

export default DashboardPage;
