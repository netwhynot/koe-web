import mongoose, { Schema, Types } from "mongoose";
import { IInventory } from "./inventory";

export interface IUser {
  username: string;
  osuId: number;
  inventory: IInventory;
  email?: string;
  discordId?: string;
  createdAt?: Date;
}

export const userSchema = new Schema<IUser>({
  username: String,
  osuId: { type: Number, unique: true },
  inventory: { type: Types.ObjectId, ref: "Inventory" },
  email: { type: String, unique: true, required: false },
  discordId: { type: String, unique: true, required: false },
  createdAt: { type: Date, default: Date.now, required: false },
});

export default mongoose.model("User", userSchema, "user");
