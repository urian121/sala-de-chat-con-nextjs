"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Mensajes from "../components/ListaMensajes";

const Chat = () => {
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [socket, setSocket] = useState(null); // Definir socket como un estado

  useEffect(() => {
    // Crear un nuevo socket
    const newSocket = io();

    // Escucha el evento de conexión al servidor y muestra un mensaje de consola
    newSocket.on("connect", () => {
      console.log("Conectado al servidor");
    });

    // Maneja el evento de error de conexión al servidor e imprime el error en la consola
    newSocket.on("connect_error", (err) => {
      console.error("Error de conexión:", err);
    });

    // Maneja el evento de desconexión del servidor e imprime un mensaje en la consola
    newSocket.on("disconnect", () => {
      console.log("Desconectado del servidor");
    });

    // Maneja el evento de llegada de un mensaje desde el servidor
    // Imprime el mensaje en la consola y actualiza el estado de mensajes
    newSocket.on("mensaje", (msg) => {
      console.log("Llego el mensaje: ", msg);
      setMensajes((prevMensajes) => [...prevMensajes, msg]);
    });

    // Establece el socket recién creado como el estado actual del componente
    setSocket(newSocket);

    return () => {
      // Limpiar los event listeners y cerrar el socket al desmontar el componente
      newSocket.off("connect");
      newSocket.off("connect_error");
      newSocket.off("disconnect");
      newSocket.off("mensaje");
      newSocket.close();
    };
  }, []);

  const enviarMensaje = () => {
    if (nuevoMensaje.trim() !== "") {
      console.log(socket);
      console.log(socket.id);
      console.log("Emitiendo mensaje", nuevoMensaje);

      // Emitir un mensaje al servidor a través del socket
      socket.emit("mensaje", nuevoMensaje);
      setNuevoMensaje("");
    }
  };

  return (
    <>
      <h1>Chat en tiempo real</h1>
      <div>
        <input
          type="text"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder="Escribe tu mensaje"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              enviarMensaje();
            }
          }}
          aria-label="Escribe tu mensaje"
        />
        <button onClick={enviarMensaje}>Enviar</button>
      </div>
      <ol>
        {mensajes.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ol>

      <Mensajes mensajes={mensajes} />
    </>
  );
};

export default Chat;
