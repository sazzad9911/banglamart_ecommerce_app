import { io } from "socket.io-client";
import { url } from "./index";
const socket = io(url,{
  autoConnect:true,
  protocols:["http", "https"],
  withCredentials:true,
  transports:['websocket']
})
export default socket