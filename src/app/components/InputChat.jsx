"use client";
import { useState } from "react";
export default function InputChat({
  enviarMensaje,
  nuevoMensaje,
  setNuevoMensaje,
  setTyping,
  socket,
}) {
  const handleChange = (e) => {
    setNuevoMensaje(e.target.value);

    if (!typing) {
      console.log("Estoy escribiendo...");
      setTyping(true);
      socket.emit("typing", true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Pulsaste Enter");
      enviarMensaje();
      setTyping(false);
      socket.emit("typing", false);
    }
  };

  const handleFocus = () => {
    console.log("Click dentro del input");
    socket.emit("typing", true);
  };

  const handleBlur = () => {
    console.log("Click fuera del input");
    socket.emit("typing", false);
  };

  return (
    <input
      type="text"
      value={nuevoMensaje}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="Escribe tu mensaje aquí..."
    />
  );
}
