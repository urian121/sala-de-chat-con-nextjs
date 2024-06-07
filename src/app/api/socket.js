import { Server } from "socket.io";
import cors from "cors";

// Create a new instance of the CORS middleware
const corsMiddleware = cors();

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "/api/socket",
    addTrailingSlash: false,
  });

  // Event handler for client connections
  io.on("connection", (socket) => {
    const clientId = socket.id;
    console.log("A client connected");
    console.log(`A client connected. ID: ${clientId}`);
    io.emit("client-new", clientId);

    // Event handler for receiving messages from the client
    socket.on("message", (data) => {
      console.log("Received message:", data);
    });

    // Event handler for client disconnections
    socket.on("disconnect", () => {
      console.log("A client disconnected.");
    });
  });

  // Apply the CORS middleware to the request and response
  corsMiddleware(req, res, () => {
    res.socket.server.io = io;
    res.end();
  });
}
