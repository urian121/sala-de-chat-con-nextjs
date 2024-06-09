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

export default function Home() {
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
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

    newSocket.on("mensaje", (msg) => {
      console.log("Llego el mensaje: ", msg);
      setMensajes((prevMensajes) => [...prevMensajes, msg]);
    });

    newSocket.on("typing", (isTyping) => {
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

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const enviarMensaje = () => {
    if (nuevoMensaje.trim() !== "") {
      const mensajeConFecha = {
        texto: nuevoMensaje,
        hora: new Date().toLocaleString(),
      };

      console.log(socket);
      console.log(socket.id);
      console.log("Emitiendo mensaje", nuevoMensaje);

      socket.emit("mensaje", mensajeConFecha);
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
