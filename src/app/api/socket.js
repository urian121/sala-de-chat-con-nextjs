import { Server } from "socket.io";
import cors from "cors";

// Cree una nueva instancia del middleware CORS
const corsMiddleware = cors();

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket.IO ya se está ejecutando");
    res.end();
    return;
  }

  // Cree una nueva instancia del servidor de Socket.IO
  const io = new Server(res.socket.server, {
    path: "/api/socket",
    cors: {
      origin: "*", // Especificar aqui el origen de los dominios permitidos
      methods: ["GET", "POST"],
    },
  });

  // Aplicar el middleware CORS a la solicitud y respuesta
  corsMiddleware(req, res, () => {
    io.on("connection", (socket) => {
      // Manejador de eventos para recibir mensajes del cliente
      socket.on("message", (data) => {
        console.log("Mensaje recibido Socket:", data);
        io.emit("message", data); // Emitir el mensaje a todos los clientes
      });

      // Controlador de eventos para escribir actualizaciones de estado
      socket.on("typing", (isTyping) => {
        console.log("hooooooo");
        // Emiter el evento 'typing' a todos los clientes excepto al que lo envía
        socket.broadcast.emit("typing", isTyping);
        // io.emit("typing", isTyping);
      });

      // Manejador de eventos para desconexiones de clientes
      socket.on("disconnect", () => {
        console.log("A client disconnected.");
      });
    });

    res.socket.server.io = io;
    res.end();
  });
}
