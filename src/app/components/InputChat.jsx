import { useState } from "react";

export default function InputChat({
  enviarMensaje,
  nuevoMensaje,
  setNuevoMensaje,
  typing,
  setTyping,
  socket,
}) {
  const handleChange = (e) => {
    setNuevoMensaje(e.target.value);

    if (!typing) {
      setTyping(true);
      socket.emit("typing", true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      enviarMensaje();
      setTyping(false);
      socket.emit("typing", false);
    }
  };

  const handleFocus = () => {
    socket.emit("typing", true);
  };

  const handleBlur = () => {
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
      placeholder="Escribe un mensaje..."
    />
  );
}
