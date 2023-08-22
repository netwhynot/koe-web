import { inventory, user } from "@/server/dbModels";

interface IRequestBody {
  osuId: number;
  username: string;
}

export default defineEventHandler(async (event) => {
  const userData = await readBody<IRequestBody>(event);

  const userDatabase = await user.findOne({
    osuId: userData.osuId,
  });

  if (userDatabase) {
    event.node.res.statusCode = 409;

    return {
      code: "USER_EXISTS",
      message: "User with given osuId already exists.",
    };
  } else {
    const newUserData = await user.create(userData);
    const newInventory = await inventory.create({
      owner: newUserData._id,
    });

    newUserData.inventory = newInventory._id;

    await newUserData.save();
    await newInventory.save();

    event.node.res.statusCode = 201;

    return newUserData;
  }
});
