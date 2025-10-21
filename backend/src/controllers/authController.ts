import type { Request, Response } from "express";
import authService from "../services/authService.js";

const signup = async (req: Request, res: Response) => {
  const { username, password, firstName, lastName } = req.body;

  try {
    const user = await authService.signupUser(
      username,
      password,
      firstName,
      lastName
    );
    res.status(201).json({ message: "Signup successfull !", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const token = await authService.signinUser(username, password);
    res.json({ message: "Signin successfull !", token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default { signup, signin };
