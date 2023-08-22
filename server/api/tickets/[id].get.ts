import { ticket } from "@/server/dbModels";

const storage = useStorage("redis");

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "sessionToken");

  if (!cookie) {
    event.node.res.statusCode = 401;

    return {
      code: "UNAUTHORIZED",
      message: "You are not authorized to do this. b",
    };
  } else {
    const tokenUser = await storage.getItem("sessions:" + cookie);

    if (!tokenUser) {
      event.node.res.statusCode = 401;

      return {
        code: "UNAUTHORIZED",
        message: "You are not authorized to do this. a",
      };
    }
  }

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
