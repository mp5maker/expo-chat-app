import { io } from "socket.io-client";
const URL = "http://localhost:3000";
const socket: any = io(URL, { autoConnect: false });

export default socket;
