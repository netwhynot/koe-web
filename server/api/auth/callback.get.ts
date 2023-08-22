import { randomBytes } from "crypto";
import axios from "axios";
import inventory from "@/server/dbModels/inventory";
import user from "@/server/dbModels/user";

const config = useRuntimeConfig();
const storage = useStorage("redis");

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "token");

  if (cookie) return sendRedirect(event, "/?fromCallback=true", 302);

  const { code: auhtorisationCode } = getQuery(event);

  const codeResponse = await axios.post(
    "https://osu.ppy.sh/oauth/token",
    {
      client_id: config.osu.clientId,
      client_secret: config.osu.clientSecret,
      code: auhtorisationCode,
      grant_type: "authorization_code",
      redirect_uri: config.osu.redirectUri,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      validateStatus: () => true,
    },
  );

  if (codeResponse.status !== 200)
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };

  const accessToken: string = codeResponse.data.access_token;

  if (!accessToken)
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };

  const osuResponse = await axios.get("https://osu.ppy.sh/api/v2/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (osuResponse.status !== 200) return;

  const userRequest = await axios.get(
    "http://localhost:3000/api/users/" + osuResponse.data.id,
    {
      validateStatus: () => true,
    },
  );

  let returnedUser = null;

  if (userRequest.status === 404) {
    const newUserData = await user.create({
      osuId: osuResponse.data.id,
      username: osuResponse.data.username,
    });
    const newInventory = await inventory.create({
      owner: newUserData._id,
    });

    newUserData.inventory = newInventory._id;

    await newUserData.save();
    await newInventory.save();

    returnedUser = newUserData;
  } else {
    returnedUser = userRequest.data;
  }

  const sessionToken = randomBytes(32).toString("hex");
  await storage.setItem("sessions:" + sessionToken, returnedUser.id);

  setCookie(event, "sessionToken", sessionToken, {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return sendRedirect(event, "/?fromCallback=true", 302);
});
