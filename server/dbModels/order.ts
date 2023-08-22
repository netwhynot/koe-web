import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "@/server/dbModels/user";

export interface IOrder {
  user: IUser | Types.ObjectId;
  createdAt: Date;
  boughtTicket: {
    ticket: Types.ObjectId;
    to: Types.ObjectId;
    from?: Types.ObjectId;
    isGifted: boolean;
  };
  status: "pending" | "completed" | "failed";
  transactionId?: string;
}

export const orderSchema = new Schema<IOrder>({
  user: { type: Types.ObjectId, ref: "User", required: true },
  boughtTicket: {
    ticket: { type: Types.ObjectId, ref: "Ticket", required: true },
    to: { type: Types.ObjectId, ref: "User", required: true },
    from: { type: Types.ObjectId, ref: "User", required: false },
    isGifted: { type: Boolean, default: false, required: false },
  },
  transactionId: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, required: true },
  status: { type: String, default: "pending" },
});

export default mongoose.model("Order", orderSchema, "order");
