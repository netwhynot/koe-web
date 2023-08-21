const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const authorizationCode = event.context.query?.code;

  if (!authorizationCode)
    return {
      code: "MISSING_AUTHORIZATION_CODE",
      message: "Missing authorization code.",
    };

  try {
    const response = await $fetch("https://osu.ppy.sh/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: {
        client_id: config.osu.OSU_CLIENT_ID,
        client_secret: config.osu.OSU_CLIENT_SECRET,
        code: authorizationCode,
        grant_type: "authorization_code",
        redirect_uri: config.osu.OSU_REDIRECT_URI,
      },
    });

    return response;
  } catch (err) {
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: err,
    };
  }
});
