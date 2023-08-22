const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "token");

  if (cookie) return sendRedirect(event, "/", 302);

  return await sendRedirect(
    event,
    `https://osu.ppy.sh/oauth/authorize?client_id=${config.osu.clientId}&redirect_uri=${config.osu.redirectUri}&response_type=code`,
    302,
  );
});
