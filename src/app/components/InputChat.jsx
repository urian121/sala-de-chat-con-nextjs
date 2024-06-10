"use client";
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

    if (e.target.value && !typing) {
      setTyping(true);

      console.log("Estoy escribiendo...", typing);
      socket.emit("typing", true);
    } else if (!e.target.value && typing) {
      setTyping(false);
      socket.emit("typing", false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Pulsaste Enter");
      enviarMensaje();
      setTyping(false);
      console.log(typing);
      socket.emit("typing", false);
    }
  };

  return (
    <input
      type="text"
      value={nuevoMensaje}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Escribe tu mensaje aquí..."
    />
  );
}
