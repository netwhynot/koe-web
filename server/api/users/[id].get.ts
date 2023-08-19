import { user } from "../../dbModels";

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id;

  try {
    const userData = await user
      .findOne({
        _id: userId,
      })
      .populate("inventory");

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
