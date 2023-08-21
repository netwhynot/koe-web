import mongoose from "mongoose";

export interface ITicket {
  type: "Spectator" | "VIP" | "Player";
  price: number;
  name: string;
  description?: string;
}

export const ticketSchema = new mongoose.Schema<ITicket>({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
});

export default mongoose.model("Ticket", ticketSchema, "ticket");
