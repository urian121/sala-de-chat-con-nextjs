"use client";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const Chat = () => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io();

    socket.current.on("connect", () => {
      console.log("Conectado al servidor");
    });

    socket.current.on("connect_error", (err) => {
      console.error("Error de conexión:", err);
    });

    socket.current.on("disconnect", () => {
      console.log("Desconectado del servidor");
    });

    socket.current.on("mensaje", (msg) => {
      console.log("Llego el mensaje: ", msg);
      setMensajes((prevMensajes) => [...prevMensajes, msg]);
    });

    return () => {
      if (socket.current) {
        socket.current.off("connect");
        socket.current.off("connect_error");
        socket.current.off("disconnect");
        socket.current.off("mensaje");
        socket.current.close();
      }
    };
  }, []);

  const enviarMensaje = () => {
    if (mensaje.trim() !== "") {
      console.log("Emitiendo mensaje", mensaje);
      socket.current.emit("mensaje", mensaje);
      setMensaje("");
    }
  };

  return (
    <div>
      <h1>Chat en tiempo real</h1>
      <div>
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
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
      <div>
        {mensajes.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
