import * as QRCode from "qrcode";
import { Types } from "mongoose";
import order from "@/server/dbModels/order";
import ticket from "@/server/dbModels/ticket";
import inventory from "@/server/dbModels/inventory";

const storage = useStorage("redis");

export interface IOrderBody {
  transactionId?: string;
  boughtTicket: {
    ticket: string;
    to: Types.ObjectId;
    from?: Types.ObjectId;
    isGifted: boolean;
  };
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
    const tokenUser = await storage.getItem("sessions:" + cookie);
    const body = await readBody<IOrderBody>(event);

    if (!tokenUser) {
      event.node.res.statusCode = 401;

      return {
        code: "UNAUTHORIZED",
        message: "You are not authorized to do this.",
      };
    }

    if (!body.boughtTicket || !body.boughtTicket.ticket) {
      event.node.res.statusCode = 400;

      return {
        code: "BAD_REQUEST",
        message: "Missing required fields.",
      };
    }

    const newOrder = await order.create({
      user: tokenUser,
      transactionId: body.transactionId,
      boughtTicket: {
        ticket: body.boughtTicket.ticket,
        to: body.boughtTicket.to,
        from: body.boughtTicket.from,
        isGifted: body.boughtTicket.isGifted,
      },
      status: "pending",
    });

    await newOrder.save();

    const ticketData = await ticket.findOne({
      _id: body.boughtTicket.ticket,
    });

    if (ticketData) {
      const forInventory = await inventory.findOne({
        owner: body.boughtTicket.to,
      });

      if (!forInventory)
        return {
          code: "USER_NOT_FOUND",
          message: "User with given id doesn't exists.",
        };

      const qrCode = await QRCode.toBuffer(newOrder._id.toString(), {
        margin: 1,
        width: 200,
        color: {
          light: "#00000000",
        },
      });

      if (body.boughtTicket.isGifted && body.boughtTicket.from) {
        const fromInventory = await inventory.findOne({
          owner: body.boughtTicket.from,
        });

        if (forInventory && fromInventory) {
          forInventory.gifts.push({
            ticket: ticketData._id,
            to: body.boughtTicket.to,
            from: body.boughtTicket.from,
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

      event.node.res.statusCode = 201;

      return newOrder;
    } else {
      return "Nigger";
    }
  }
});
