import Image from "next/image";

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
                src="/imgs/user_9.jpg"
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
                src="/imgs/user_8.svg"
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
