import Account from "../models/Account.js";
import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

const signupUser = async (
  username: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const existing = await User.findOne({ username });
  if (existing) throw new Error("Username already exists");

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({
    username,
    password: hashedPassword,
    firstName,
    lastName,
  });

  // default wallet account
  await Account.create({
    user: newUser._id,
  });

  return {
    _id: newUser._id,
    username: newUser.username,
    firstName: newUser.firstName,
    lastName: lastName,
  };
};

const signinUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Invalid credentials");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = signToken({ userId: user._id });
  return token;
};

export default { signupUser, signinUser };
