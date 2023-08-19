import mongoose from "mongoose";

export const ticketSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
});

export default mongoose.model("Ticket", ticketSchema, "ticket");
