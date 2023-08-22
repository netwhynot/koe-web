import * as QRCode from "qrcode";
import mongoose from "mongoose";
import { inventory, ticket } from "@/server/dbModels";

const storage = useStorage();

interface IRequestBody {
  orderId: string;
  forUser: mongoose.Types.ObjectId;
  isGift: boolean;
  fromUser?: mongoose.Types.ObjectId;
}

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "sessionToken");

  if (!cookie) {
    event.node.res.statusCode = 401;

    return {
      code: "UNAUTHORIZED",
      message: "You are not authorized to do this.",
    };
  } else {
    const tokenUser = await storage.getItem(cookie);

    if (!tokenUser) {
      event.node.res.statusCode = 401;

      return {
        code: "UNAUTHORIZED",
        message: "You are not authorized to do this.",
      };
    }
  }

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

    const qrCode = await QRCode.toBuffer(purchaseData.orderId, {
      margin: 1,
      width: 200,
      color: {
        light: "#00000000",
      },
    });

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
          qrCode: qrCode.toString("base64"),
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
        qrCode: qrCode.toString("base64"),
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
