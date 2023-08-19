import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: String,
  osuId: { type: Number, unique: true },
  inventory: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory" },
  email: { type: String, unique: true, required: false },
  discordId: { type: String, unique: true, required: false },
  createdAt: { type: Date, default: Date.now, required: false },
});

export default mongoose.model("User", userSchema, "user");
