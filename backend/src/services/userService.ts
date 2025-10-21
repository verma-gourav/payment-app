import Account, { AccountType } from "../models/Account.js";
import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/password.js";

const getUserProfile = async (userId: string) => {
  const user = await User.findById(userId).select("-password").lean();
  if (!user) throw new Error("User not found");

  const account = await Account.findOne({
    user: userId,
    type: AccountType.WALLET,
  }).lean();

  const cents = account?.balanceInCents || 0;
  const balance = cents / 100;

  return {
    user,
    account: {
      _id: account?._id,
      balance,
    },
  };
};

// just password update allowed
const updateUserProfile = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const match = await comparePassword(currentPassword, user.password);
  if (!match) throw new Error("Old password is incorrect");

  user.password = await hashPassword(newPassword);

  await user.save();

  return { message: "Password updated successfully" };
};

const searchUser = async (query: string, currentUserId: string) => {
  const regex = new RegExp(query, "i");
  const users = await User.find({
    username: regex,
    _id: { $ne: currentUserId }, // exclude self
  })
    .select("username firstName lastName")
    .limit(10)
    .lean();

  // each user's account id
  const usersWithWallets = await Promise.all(
    users.map(async (user) => {
      const account = await Account.findOne({
        user: user._id,
        type: AccountType.WALLET,
      }).select("_id balance");

      return { ...user, walletAccountId: account?._id };
    })
  );

  return usersWithWallets.filter((u) => u.walletAccountId);
};

export default { getUserProfile, updateUserProfile, searchUser };
