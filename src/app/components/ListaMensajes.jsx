import Image from "next/image"; // Asegúrate de importar Image desde el paquete correcto

export default function ListaMensajes({ mensajes }) {
  return (
    <div className="chat-area-main">
      {mensajes.map((mensaje, index) =>
        index % 2 === 0 ? (
          <div key={index} className="chat-msg owner">
            <div className="chat-msg-profile">
              <Image
                width={44}
                height={44}
                className="chat-msg-img"
                src="https://www.urianviera.com/_image?href=%2F_astro%2F6.g6aJEwBH.jpg&f=webp"
                alt=""
              />
              <div className="chat-msg-date">{mensaje.hora}</div>
            </div>
            <div className="chat-msg-content">
              <div className="chat-msg-text">{mensaje.texto}</div>
            </div>
          </div>
        ) : (
          <div key={index} className="chat-msg">
            <div className="chat-msg-profile">
              <Image
                width={44}
                height={44}
                className="chat-msg-img"
                src="/imgs/user_10x.jpg"
                alt=""
              />
              <div className="chat-msg-date">{mensaje.hora}</div>
            </div>
            <div className="chat-msg-content">
              <div className="chat-msg-text">{mensaje.texto}</div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
