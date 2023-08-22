import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "@/server/dbModels/user";
import { ITicket } from "@/server/dbModels/ticket";

export interface IInventoryTicket {
  ticket: ITicket | Types.ObjectId;
  isGifted: boolean;
  createdAt: Date;
  isActive?: boolean;
  qrCode?: string;
}

export interface IInventoryGift {
  ticket: ITicket | Types.ObjectId;
  to: IUser | Types.ObjectId;
  from: IUser | Types.ObjectId;
  isActive?: boolean;
  giftedAt: Date;
  qrCode?: string;
}

export interface IInventory {
  owner: IUser | Types.ObjectId;
  tickets: IInventoryTicket[];
  gifts: IInventoryGift[];
}

export const inventorySchema = new Schema<IInventory>({
  owner: { type: Types.ObjectId, ref: "User", required: true },
  tickets: [
    {
      ticket: { type: Types.ObjectId, ref: "Ticket" },
      isGifted: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
      isActive: { type: Boolean, default: false },
      qrCode: { type: String, required: false },
    },
  ],
  gifts: [
    {
      ticket: { type: Types.ObjectId, ref: "Ticket", required: true },
      to: { type: Types.ObjectId, ref: "User", required: true },
      from: { type: Types.ObjectId, ref: "User", required: true },
      giftedAt: { type: Date, default: Date.now },
      isActive: { type: Boolean, default: false },
      qrCode: { type: String, required: false },
    },
  ],
});

export default mongoose.model("Inventory", inventorySchema, "inventory");
