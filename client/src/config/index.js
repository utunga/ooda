export const isDev = Boolean(process.env.NODE_ENV !== "production");

export default {
  connection: process.env.VUE_APP_API_URL
    ? process.env.VUE_APP_API_URL
    : "https://ooda-loops-server-hznyijyqys.now.sh", //"http://localhost:3030",
  domain: !isDev ? "*.now.sh" : "localhost"
};
