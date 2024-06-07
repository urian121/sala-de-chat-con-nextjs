const { createServer } = require("http"); // Importa el módulo HTTP para crear el servidor
const { parse } = require("url"); // Importa el módulo URL para analizar las URL entrantes
const next = require("next"); // Importa el framework Next.js
const socketIo = require("socket.io"); // Importa Socket.IO para la funcionalidad de tiempo real

const dev = process.env.NODE_ENV !== "production"; // Determina si el entorno es de desarrollo
const app = next({ dev }); // Inicializa la aplicación Next.js con el entorno adecuado
const handle = app.getRequestHandler(); // Obtiene el manejador de solicitudes de Next.js

app.prepare().then(() => {
  // Prepara la aplicación Next.js (compila las páginas, etc.)

  const server = createServer((req, res) => {
    // Crea el servidor HTTP
    const parsedUrl = parse(req.url, true); // Analiza la URL entrante
    handle(req, res, parsedUrl); // Maneja la solicitud usando Next.js
  });

  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000", // Permite conexiones desde este origen (ajustar según sea necesario)
      methods: ["GET", "POST"], // Métodos HTTP permitidos
    },
  });

  io.on("connection", (socket) => {
    // Evento cuando un cliente se conecta
    console.log("Cliente conectado");

    // Creando evento 'mensaje'
    socket.on("mensaje", (msg) => {
      // Evento cuando se recibe un mensaje del cliente
      console.log("Mensaje recibido:", msg);
      io.emit("mensaje", msg); // Emitir el mensaje a todos los clientes conectados
    });

    // Creando evento 'disconnect'
    socket.on("disconnect", () => {
      // Evento cuando un cliente se desconecta
      console.log("Cliente desconectado");
    });
  });

  const port = process.env.PORT || 3000; // Define el puerto en el que el servidor escuchará
  server.listen(port, (err) => {
    // Inicia el servidor HTTP
    if (err) throw err; // Lanza un error si ocurre
    console.log(`> Ready on http://localhost:${port}`); // Mensaje de confirmación cuando el servidor está listo
  });
});
