"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  Camera,
  Video,
  ImagePlus,
  Paperclip,
  CirclePlus,
  SmilePlus,
  ThumbsUp,
  Settings,
  SunMoon,
} from "lucide-react";
import InputChat from "./components/InputChat";
import ListaMensajes from "./components/ListaMensajes";
import useDarkMode from "./hooks/useDarkMode";

export default function Home() {
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [socket, setSocket] = useState(null);
  const [typing, setTyping] = useState(false);
  const [toggleDarkMode] = useDarkMode();

  useEffect(() => {
    // Crea un nuevo socket
    const newSocket = io();

    newSocket.on("connect", () => {
      console.log("Conectado al servidor");
    });

    newSocket.on("connect_error", (err) => {
      console.error("Error de conexión:", err);
    });

    newSocket.on("disconnect", () => {
      console.log("Desconectado del servidor");
    });

    // Escucha el evento 'mensaje' del socket
    newSocket.on("mensaje", (msg) => {
      console.log("tengo un nuevo mensaje");
      setMensajes((prevMensajes) => [...prevMensajes, msg]);
    });

    // Escucha el evento 'typing' del socket
    newSocket.on("typing", (isTyping) => {
      console.log("llegue a typing", isTyping);
      setTyping(isTyping);
    });

    setSocket(newSocket);

    return () => {
      newSocket.off("connect");
      newSocket.off("connect_error");
      newSocket.off("disconnect");
      newSocket.off("mensaje");
      newSocket.off("typing");
      newSocket.close();
    };
  }, []);

  const enviarMensaje = () => {
    if (nuevoMensaje.trim() !== "") {
      const mensajeConFecha = {
        texto: nuevoMensaje,
        hora: new Date().toLocaleString(),
      };

      socket.emit("mensaje", mensajeConFecha);
      console.log("Emitiendo el mensaje", typing);
      setNuevoMensaje("");
    }
  };

  return (
    <>
      <div className="app">
        <div className="header">
          <div className="search-bar">
            <h2>Sala de Chat con Next.js</h2>
          </div>
          <div className="user-settings">
            <div className="dark-light" onClick={toggleDarkMode}>
              <SunMoon />
            </div>
            <div className="settings">
              <Settings />
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="chat-area">
            <ListaMensajes mensajes={mensajes} />
            {typing && (
              <div className="ticontainer">
                <div className="tiblock">
                  <div className="tidot"></div>
                  <div className="tidot"></div>
                  <div className="tidot"></div>
                </div>
              </div>
            )}
            <div className="chat-area-footer">
              <Camera />
              <Video />
              <ImagePlus />
              <CirclePlus />
              <Paperclip />
              <InputChat
                enviarMensaje={enviarMensaje}
                nuevoMensaje={nuevoMensaje}
                setNuevoMensaje={setNuevoMensaje}
                socket={socket}
                typing={typing}
                setTyping={setTyping}
              />
              <SmilePlus />
              <ThumbsUp />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
