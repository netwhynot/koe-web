import { ticket } from "@/server/dbModels";

export default defineEventHandler(async (event) => {
  const ticketId = event.context.params?.id;

  try {
    const ticketData = await ticket.findOne({
      _id: ticketId,
    });

    if (ticketData) {
      return ticketData;
    } else {
      event.node.res.statusCode = 404;

      return {
        code: "TICKET_NOT_FOUND",
        message: `Ticket with id ${ticketId} doesn't exists.`,
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
