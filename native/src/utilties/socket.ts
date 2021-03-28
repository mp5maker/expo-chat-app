import { io } from "socket.io-client";
import isAndroid from "./isAndroid";

const hasAndroid = isAndroid();
const URL = hasAndroid ? "http://10.0.2.2:3000" : "http://localhost:3000";

const socket: any = io(URL, {
  autoConnect: false,
  ...(hasAndroid ? { transports: ["websocket"] } : {}),
});

export default socket;
