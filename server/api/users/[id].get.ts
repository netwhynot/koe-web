import { IInventoryGift, IInventoryTicket } from "@/server/dbModels/inventory";
import { inventory, user } from "@/server/dbModels";
import ticket from "@/server/dbModels/ticket";

export default defineEventHandler(async (event) => {
  const userId = event.context.params!.id;

  try {
    const userFilter =
      userId.length === 24
        ? { _id: userId }
        : {
            $or: [
              { osuId: isNaN(Number(userId)) ? 1 : userId },
              { username: userId },
              { email: userId },
            ],
          };

    const userData = await user.findOne(userFilter);

    if (!userData) {
      event.node.res.statusCode = 404;

      return {
        code: "USER_NOT_FOUND",
        message: `User with id ${userId} doesn't exists.`,
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
        message: `User with id ${userId} doesn't exists.`,
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
