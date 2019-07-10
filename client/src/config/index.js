//import { connection } from "mongoose";

export const isDev = Boolean(process.env.NODE_ENV !== "production");

export default {
  // connection: process.env.VUE_APP_API_URL
  //   ? process.env.VUE_APP_API_URL
  
  domain: !isDev
    ? "*.now.sh"
    : "localhost",
  connection: !isDev
    ? "https://ooda-loops-server.now.sh"
    : "http://localhost:3030"
};

