import { ticket } from "@/server/dbModels";

export default defineEventHandler(async (event) => {
  try {
    const ticketData = await ticket.find({});

    if (ticketData) {
      return ticketData;
    } else {
      event.node.res.statusCode = 404;

      return {
        code: "TICKET_NOT_FOUND",
        message: "No tickets found.",
      };
    }
  } catch (err) {
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: err,
    };
  }
});
