import { ticket } from "@/server/dbModels";

const storage = useStorage("redis");

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "sessionToken");

  if (!cookie) {
    event.node.res.statusCode = 401;

    return {
      code: "UNAUTHORIZED",
      message: "You are not authorized to do this. a",
    };
  } else {
    const tokenUser = await storage.getItem("sessions:" + cookie);

    if (!tokenUser) {
      event.node.res.statusCode = 401;

      return {
        code: "UNAUTHORIZED",
        message: "You are not authorized to do this. b",
      };
    }
  }

  try {
    const ticketData = await ticket.find({});

    if (ticketData) {
      return ticketData;
    } else {
      event.node.res.statusCode = 404;

      return {
        code: "TICKETS_NOT_FOUND",
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
