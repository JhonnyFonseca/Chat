
import { useState, useEffect } from 'react' //Importa la función useState desde la librería React, que permite a los componentes React utilizar el estado interno.
import './App.css' //Importa un archivo CSS llamado App.css para estilizar el componente.
import io from 'socket.io-client' //Importa la librería socket.io-client bajo el nombre io, que se utiliza para establecer una conexión de socket con el servidor.
import Chat from './Chat' //Importa el componente Chat desde el archivo Chat.js o Chat.jsx ubicado en la misma carpeta que este archivo.
import {CardContent, Card, Icon ,Container, Divider, FormField, Button, Form } from 'semantic-ui-react' // Importa varios componentes de Semantic UI React para ser utilizados en este archivo.
const socket = io.connect("http://localhost:3001") //Crea una conexión de socket con el servidor que se encuentra en http://localhost:3001 y almacena el objeto de socket resultante en la variable socket.
function App() { //Define un componente funcional llamado App.
  const [username, setUsername] = useState("") //Declara un estado llamado username y una función setUsername para actualizar ese estado, con un valor inicial de una cadena vacía.
  const [room, setRoom] = useState("") //Declara un estado llamado room y una función setRoom para actualizar ese estado, con un valor inicial de una cadena vacía.
  const [showChat, setShowChat] = useState(false); //Declara un estado llamado showChat y una función setShowChat para actualizar ese estado, con un valor inicial de false.
  const joinRoom = () =>{ //Define una función llamada joinRoom, que se ejecuta cuando se hace clic en el botón "Unirme". Esta función verifica si tanto el nombre de usuario (username) como el nombre de la sala (room) no están vacíos, y si no lo están, emite un evento "join_room" a través del socket y establece showChat en true.
    
    if(username  != "" && room != ""){ 
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }
  return ( //Define el cuerpo del componente App. Si showChat es false, se muestra un formulario de inicio de sesión; de lo contrario, se muestra el componente Chat.
    <>
    <Container> 
    {!showChat?(
      <Card fluid>
      <CardContent header="Unirme al chat" />
      <CardContent >
      <Form>
    <FormField>
      <label>Usuario: </label>
      <input type='text' placeholder='Chris...' 
          onChange={e => setUsername(e.target.value)}/> {/*Establece los estados username y room respectivamente, según los valores ingresados en los campos de entrada de texto.*/}
    </FormField>
    <FormField>
      <label>Sala: </label>
      <input type='text' placeholder='Id Sala:' 
          onChange={e => setRoom(e.target.value)}/> 
    </FormField>
      <Button onClick={joinRoom}>Unirme</Button> {/*Crea un botón que, cuando se hace clic, llama a la función joinRoom.*/}
    </Form>
      </CardContent>
    </Card>
    ):(
    <Chat socket={socket} username={username} room={room} />
    )}
    </Container>
    </>
  )
}
export default App //Exporta el componente App para que pueda ser importado y utilizado en otros archivos.
