import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { TABLE_USER } from '../config/table';

interface IUser {
  username: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
}

interface UserModelInterface extends mongoose.Model<IUser> {}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();

    this.password = bcrypt.hashSync(this.password as string, 10);

    return next();
  } catch (err: any) {
    return next(err);
  }
});

export const UsersModel = mongoose.model<
  UserDoc,
  UserModelInterface
>(TABLE_USER, userSchema);
