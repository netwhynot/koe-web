import mongoose, { Schema } from "mongoose";

export const inventorySchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tickets: [
    {
      ticket: { type: Schema.Types.ObjectId, ref: "Ticket" },
      isGifted: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  gifts: [
    {
      ticket: { type: Schema.Types.ObjectId, ref: "Ticket", required: true },
      to: { type: Schema.Types.ObjectId, ref: "User", required: true },
      from: { type: Schema.Types.ObjectId, ref: "User", required: true },
      giftedAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Inventory", inventorySchema, "inventory");
