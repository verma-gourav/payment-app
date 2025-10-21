import type { Request, Response } from "express";
import userService from "../services/userService.js";

const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const data = await userService.getUserProfile(userId);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ message: "err.message" });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const updated = await userService.updateUserProfile(
      userId,
      req.body.currentPassword,
      req.body.newPassword
    ); // only password update allowed

    res.json({ message: "Password updated" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const searchUser = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const currentUserId = req.userId!;
    if (!query) return res.status(400).json({ message: "Query required" });

    const results = await userService.searchUser(query, currentUserId);
    res.json(results);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default { getProfile, updateProfile, searchUser };
