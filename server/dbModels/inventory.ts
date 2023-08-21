import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "./user";
import { ITicket } from "./ticket";

export interface IInventoryTicket {
  ticket: ITicket;
  isGifted: boolean;
  createdAt: Date;
}

export interface IInventoryGift {
  ticket: ITicket;
  to: IUser;
  from: IUser;
  giftedAt: Date;
}

export interface IInventory {
  owner: IUser;
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
    },
  ],
  gifts: [
    {
      ticket: { type: Types.ObjectId, ref: "Ticket", required: true },
      to: { type: Types.ObjectId, ref: "User", required: true },
      from: { type: Types.ObjectId, ref: "User", required: true },
      giftedAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Inventory", inventorySchema, "inventory");
