import { Server } from "socket.io";
import cors from "cors";

// Cree una nueva instancia del middleware CORS
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

  // Controlador de eventos para conexiones de clientes
  io.on("connection", (socket) => {
    const clientId = socket.id;
    console.log("A client connected");
    console.log(`A client connected. ID: ${clientId}`);
    io.emit("client-new", clientId);

    // Manejador de eventos para recibir mensajes del cliente.
    socket.on("message", (data) => {
      console.log("Received message:", data);
    });

    // Controlador de eventos para escribir actualizaciones de estado
    socket.on("typing", (isTyping) => {
      socket.broadcast.emit("typing", isTyping);
    });

    // Manejador de eventos para desconexiones de clientes
    socket.on("disconnect", () => {
      console.log("A client disconnected.");
    });
  });

  // Aplicar el middleware CORS a la solicitud y respuesta.
  corsMiddleware(req, res, () => {
    res.socket.server.io = io;
    res.end();
  });
}
