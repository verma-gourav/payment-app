import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
