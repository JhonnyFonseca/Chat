const express = require("express") //Importa el módulo Express, un marco de aplicación web para Node.js, que permite crear aplicaciones web y APIs de manera sencilla.
const app = express() //Crea una nueva instancia de la aplicación Express.
const http = require("http") //Importa el módulo http de Node.js, que proporciona funcionalidades para crear servidores HTTP.
const cors = require("cors") //Importa el módulo CORS (Cross-Origin Resource Sharing), que es un middleware de Express para habilitar el intercambio de recursos entre diferentes orígenes
const {Server} = require("socket.io") //Importa la clase Server del módulo socket.io, que proporciona funcionalidades para crear y gestionar servidores de socket. 
app.use(cors()) //Usa el middleware CORS para permitir solicitudes entre diferentes orígenes.

const server = http.createServer(app) //Crea un servidor HTTP utilizando la aplicación Express app.

const os = require('os'); //obtiene la información del sistema operativo donde esta corriendo el aplicativo
const ifaces = os.networkInterfaces(); //obtiene las interfaces de red para ver donde esta conectado
let serverIp = ''; //crea una variable en la cual se guarda la ip del servidor

Object.keys(ifaces).forEach(ifname => { //indaga lo que se obtiene por los tres pasos anteriores
    ifaces[ifname].forEach(iface => { //se crea la función flecha para hacer la adjunción del servidor
      if (iface.family === 'IPv4' && !iface.internal) { //si la familia de la señal es ipv4 y es diferente a la interfaz interna puede proceder
        serverIp = iface.address; //se almacena en la variable la dirección ip
      }
    });
  });
  
  console.log('Dirección IP del servidor:', serverIp); //se imprime por consola la ip a la cual esl servidor esta corriendo

  
  
const io = new Server(server, { // Crea una instancia de un servidor socket.io, pasando el servidor HTTP creado anteriormente. También se configura el servidor para permitir conexiones desde el origen http://localhost:5173 y los métodos HTTP GET y POST.
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})
io.on("connection", (socket) =>{ //Escucha el evento "connection" que se emite cuando un cliente se conecta al servidor de socket. Se ejecuta una función de devolución de llamada que recibe un objeto socket, que representa la conexión del cliente recién conectado.
    console.log(`Usuario actual: ${socket.id}`) //Imprime en la consola el ID del socket del cliente recién conectado.
    socket.on("join_room",(data)=>{ // Escucha el evento "join_room" enviado por el cliente. Se ejecuta una función de devolución de llamada que recibe un objeto data que contiene la información de la sala a la que el cliente desea unirse. El servidor agrega al cliente a la sala especificada utilizando socket.join() y lo registra en la consola.
        socket.join(data)
        console.log(`Usuario con id: ${socket.id} se unió a la sala: ${data}`)
    })
    socket.on("send_message",(data)=>{ // Escucha el evento "send_message" enviado por el cliente. Se ejecuta una función de devolución de llamada que recibe un objeto data que contiene el mensaje y la sala a la que debe enviarse el mensaje. El servidor emite el evento "receive_message" a todos los clientes en la sala específica excepto al cliente que envió el mensaje.
        socket.to(data.room).emit("receive_message", data);
    })
    socket.on("disconnect", ()=>{ // Escucha el evento "disconnect" que se emite cuando un cliente se desconecta del servidor de socket. Se ejecuta una función de devolución de llamada que registra en la consola la desconexión del cliente.
        console.log("Usuario desconectado", socket.id)
    })
})
server.listen(3001,() => { //  Hace que el servidor escuche las conexiones en el puerto 3001. Cuando el servidor comienza a escuchar, imprime "SERVER RUNNING" en la consola.
    console.log("SERVER RUNNING")
})