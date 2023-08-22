import { IInventoryGift, IInventoryTicket } from "@/server/dbModels/inventory";
import { inventory, user } from "@/server/dbModels";
import ticket from "@/server/dbModels/ticket";

const storage = useStorage("redis");

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "sessionToken");

  if (!cookie) {
    event.node.res.statusCode = 401;

    return {
      code: "UNAUTHORIZED",
      message: "You are not authorized to do this. Cookie.",
    };
  }

  const tokenUser = await storage.getItem("sessions:" + cookie);

  if (!tokenUser) {
    event.node.res.statusCode = 401;

    return {
      code: "UNAUTHORIZED",
      message: "You are not authorized to do this. User.",
    };
  }

  try {
    const userData = await user.findOne({
      _id: tokenUser,
    });

    if (!userData) {
      event.node.res.statusCode = 404;

      return {
        code: "USER_NOT_FOUND",
        message: `User with id ${tokenUser} doesn't exists.`,
      };
    }

    const userInventory = await inventory
      .findOne({
        owner: userData._id,
      })
      .select("-owner -__v");

    userInventory!.tickets = await Promise.all(
      userInventory!.tickets.map<Promise<IInventoryTicket>>(
        async (inventoryTicket) => {
          const databaseTicket = await ticket.findOne({
            _id: inventoryTicket.ticket,
          });

          if (databaseTicket)
            return {
              ...inventoryTicket,
              ticket: databaseTicket,
            };
          else return inventoryTicket;
        },
      ),
    );

    userInventory!.gifts = await Promise.all(
      userInventory!.gifts.map<Promise<IInventoryGift>>(
        async (inventoryGift) => {
          const databaseTicket = await ticket.findOne({
            _id: inventoryGift.ticket,
          });

          if (databaseTicket)
            return {
              ...inventoryGift,
              ticket: databaseTicket,
            };
          else return inventoryGift;
        },
      ),
    );

    userData!.inventory = userInventory!;

    if (userData) {
      return {
        id: userData._id,
        osuId: userData.osuId,
        username: userData.username,
        inventory: userData.inventory,
        email: userData.email,
        discordId: userData.discordId,
        createdAt: userData.createdAt,
      };
    } else {
      event.node.res.statusCode = 404;

      return {
        code: "USER_NOT_FOUND",
        message: `User with id ${tokenUser} doesn't exists.`,
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
