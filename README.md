# Chat en tiempo real con Socket.io / socket.io-client en Next.js

##### Instalar

    npm i socket.io socket.io-client

##### Referencia
    https://blog.stackademic.com/building-a-real-time-chat-app-with-next-js-socket-io-and-typescript-e60ba40c09c7

##### Ajustes en el lado del servidor archivo server.js:

    Revisar el nombre del evento: Asegúrate de que los nombres de los eventos sean coherentes en el lado del cliente y el servidor. En tu código del servidor, estás usando el evento "message", mientras que en el cliente estás usando "mensaje". Deben coincidir.

    Configurar CORS en el servidor: Para permitir que tu cliente Next.js se conecte al servidor de Socket.IO, es posible que necesites configurar CORS correctamente.

###### Ajustes en el lado del cliente archivo app/chat/page.jsx:

    Asegúrate de que el cliente está conectado a la URL correcta del servidor.
    Usar el nombre del evento que coincide con el servidor.


    Asegúrate de que los nombres de los eventos ("mensaje") coincidan en el cliente y el servidor.
    Configura CORS en el servidor para permitir las conexiones desde el origen de tu aplicación Next.js.
    Verifica que la URL de conexión del cliente apunte correctamente a tu servidor de Socket.IO.
    Con estos ajustes, deberías poder recibir los mensajes correctamente en tu aplicación de chat en tiempo real.

##### socket.io-client

    La librería socket.io-client se utiliza para permitir la comunicación en tiempo real entre clientes (generalmente navegadores web) y un servidor que utiliza Socket.IO. Aquí te dejo un resumen de para qué sirve y cómo se usa:
    Propósito de socket.io-client

    Comunicación en tiempo real: Permite a los clientes comunicarse con el servidor en tiempo real mediante WebSockets, lo que proporciona una conexión persistente y bidireccional.
    Eventos personalizados: Facilita la emisión y escucha de eventos personalizados entre el cliente y el servidor, lo que es útil para aplicaciones que necesitan reaccionar a eventos específicos.
    Fallback a HTTP: Si los WebSockets no están disponibles, socket.io-client puede utilizar otros mecanismos de transporte como HTTP long-polling, asegurando la conectividad.
    Conexión robusta: Maneja automáticamente la reconexión en caso de desconexiones, lo que mejora la robustez de la aplicación.

##### archivo server.js:

    El archivo server.js en un proyecto Next.js con Socket.IO tiene la función de configurar y ejecutar el servidor de la aplicación, proporcionando la infraestructura necesaria para manejar tanto las solicitudes HTTP regulares como las conexiones WebSocket para la comunicación en tiempo real.

    Resumen

    Servidor Next.js: Usas socket.io para habilitar comunicación en tiempo real en el lado del servidor.
    Cliente Next.js: Usas socket.io-client para conectar tu aplicación cliente al servidor de Socket.IO.
    Comunicación en tiempo real: Puedes enviar y recibir eventos y datos en tiempo real entre el cliente y el servidor, mejorando la interactividad de tu aplicación.

    Esto permite que tu aplicación Next.js soporte funcionalidades de tiempo real de manera eficiente y escalable.

    https://www.youtube.com/watch?v=-C79UgTklVY

##### Notas

    io.emit: Emitirá el evento a todos los clientes, incluyendo al que lo envió.
    socket.broadcast.emit: Emitirá el evento a todos los clientes excepto al que lo envió.
    socket.on("typing", (isTyping) => {
        socket.broadcast.emit("typing", isTyping);
      });

    socket.on("typing", (isTyping) => {
        io.emit("typing", isTyping);
      });

En resumen, en server.js, estás configurando el servidor de Socket.IO en el nivel del servidor HTTP y manejando eventos para todas las conexiones de Socket.IO. Mientras que en socket.js, estás configurando un endpoint de Socket.IO específico en una API utilizando Next.js y manejando eventos para conexiones individuales en ese endpoint.

server.js: Este archivo es donde se configura y se inicia el servidor de Socket.IO en el contexto de toda la aplicación. El evento message en este archivo escucha mensajes que provienen de cualquier cliente conectado al servidor y los reenvía a todos los demás clientes. El evento typing escucha cuando un cliente está escribiendo y emite este estado a todos los demás clientes excepto al que lo está escribiendo.

socket.js: Este archivo maneja la lógica específica del endpoint de la API de Socket.IO en tu aplicación. Aquí, nuevamente, escuchas los eventos message y typing. Aunque el manejo de message en este archivo es bastante diferente (envía el mensaje a todos los clientes), la lógica para typing es similar a la de server.js. Cuando un cliente está escribiendo, este archivo emite el estado de escritura a todos los demás clientes conectados a través del evento typing.

En resumen, ambos archivos están escuchando estos eventos porque están involucrados en la gestión de la comunicación en tiempo real en tu aplicación. Aunque la implementación específica de cómo manejar estos eventos puede variar dependiendo de dónde se encuentren dentro de tu aplicación (global vs. específico de la API), la funcionalidad principal de los eventos sigue siendo la misma: comunicación en tiempo real entre clientes.

### Resultado final

![](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/sala-de-chat-con-Nextjs.png)

### Expresiones de Gratitud 🎁

    Comenta a otros sobre este proyecto 📢
    Invita una cerveza 🍺 o un café ☕
    Paypal iamdeveloper86@gmail.com
    Da las gracias públicamente 🤓.

## No olvides SUSCRIBIRTE 👍
