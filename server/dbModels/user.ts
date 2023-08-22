import mongoose, { Schema, Types } from "mongoose";
import { IInventory } from "@/server/dbModels/inventory";

export interface IUser {
  username: string;
  role: "user" | "admin";
  osuId: number;
  inventory: IInventory | Types.ObjectId;
  email?: string;
  discordId?: string;
  createdAt?: Date;
}

export const userSchema = new Schema<IUser>({
  username: String,
  role: { type: String, default: "user" },
  osuId: { type: Number, unique: true },
  inventory: { type: Types.ObjectId, ref: "Inventory" },
  email: { type: String, required: false },
  discordId: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, required: false },
});

export default mongoose.model("User", userSchema, "user");
