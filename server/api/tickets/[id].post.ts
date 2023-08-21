import mongoose from "mongoose";
import { inventory, ticket } from "@/server/dbModels";

interface IRequestBody {
  forUser: mongoose.Types.ObjectId;
  isGift: boolean;
  fromUser?: mongoose.Types.ObjectId;
}

export default defineEventHandler(async (event) => {
  const ticketId = event.context.params?.id;
  const purchaseData: IRequestBody = await readBody(event);

  const ticketData = await ticket.findOne({
    _id: ticketId,
  });

  if (ticketData) {
    const forInventory = await inventory.findOne({
      owner: purchaseData.forUser,
    });

    if (!forInventory)
      return {
        code: "USER_NOT_FOUND",
        message: "User with given id doesn't exists.",
      };

    if (purchaseData.isGift && purchaseData.fromUser) {
      const fromInventory = await inventory.findOne({
        owner: purchaseData.fromUser,
      });

      if (forInventory && fromInventory) {
        forInventory.gifts.push({
          ticket: ticketData._id,
          to: purchaseData.forUser,
          from: purchaseData.fromUser,
          giftedAt: new Date(),
        });
        fromInventory.tickets.push({
          ticket: ticketData,
          isGifted: true,
          createdAt: new Date(),
        });

        await forInventory.save();
        await fromInventory.save();
      }
    } else {
      forInventory.tickets.push({
        ticket: ticketData._id,
        isGifted: false,
        createdAt: new Date(),
      });

      await forInventory.save();
    }

    return {
      code: "SUCCESS",
      message: "Ticket successfully purchased.",
    };
  } else {
    event.node.res.statusCode = 404;

    return {
      code: "TICKET_NOT_FOUND",
      message: "Ticket with given id doesn't exists.",
    };
  }
});
