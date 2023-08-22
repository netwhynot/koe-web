import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "@/server/dbModels/user";

export interface IOrder {
  user: IUser | Types.ObjectId;
  createdAt: Date;
  status: "pending" | "completed" | "failed";
  transactionId?: string;
}

export const userSchema = new Schema<IOrder>({
  user: { type: Types.ObjectId, ref: "User", required: true },
  transactionId: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, required: true },
  status: { type: String, default: "pending" },
});

export default mongoose.model("User", userSchema, "user");
