import mongoose from "mongoose";
import { inventory, user } from "../../../dbModels";

interface IRequestBody {
  userId: mongoose.Types.ObjectId;
  ticket: {
    type: mongoose.Types.ObjectId;
    isGifted: boolean;
    giftedTo?: string;
  };
}

export default defineEventHandler(async (event) => {
  const ticketData = await readBody<IRequestBody>(event);

  const userDatabase = await user.findOne({
    _id: ticketData.userId,
  });

  if (userDatabase) {
    const userInventory = await inventory.findOne({
      owner: ticketData.userId,
    });

    userInventory!.tickets.push({
      ticket: ticketData.ticket.type,
      isGifted: ticketData.ticket.isGifted,
      createdAt: new Date(),
    });

    await userInventory!.save();

    if (ticketData.ticket.isGifted) {
      const giftedUser = await user.findOne({
        username: ticketData.ticket.giftedTo,
      });

      if (giftedUser) {
        userInventory!.gifts.push({
          ticket: ticketData.ticket.type,
          to: giftedUser._id,
          from: ticketData.userId,
          giftedAt: new Date(),
        });

        await userInventory!.save();
      } else {
        event.node.res.statusCode = 404;

        return {
          code: "USER_NOT_FOUND",
          message: "User with given username doesn't exists.",
        };
      }
    }
  } else {
    event.node.res.statusCode = 404;

    return {
      code: "USER_NOT_FOUND",
      message: "User with given username doesn't exists.",
    };
  }
});
