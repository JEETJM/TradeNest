import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export const marketSocket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
});

export const connectMarketSocket = () => {
  if (!marketSocket.connected) {
    marketSocket.connect();
  }
};

export const disconnectMarketSocket = () => {
  if (marketSocket.connected) {
    marketSocket.disconnect();
  }
};