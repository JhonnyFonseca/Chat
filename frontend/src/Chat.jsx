import React, { useEffect, useState } from "react"; //Importa React, la función useEffect, y la función useState desde la librería "react". Estas funciones son esenciales para crear componentes React y gestionar el estado y los efectos secundarios en ellos.
import { MessageHeader, Message, Input,CardContent, Card, Icon ,Container, Divider, FormField, Button, Form } from 'semantic-ui-react' //Importa varios componentes de Semantic UI React que se utilizarán en este archivo para diseñar la interfaz de usuario.
import ScrollToBottom from 'react-scroll-to-bottom' //Importa el componente ScrollToBottom de la librería "react-scroll-to-bottom", que se utiliza para desplazar automáticamente hacia abajo cuando se agrega nuevo contenido.
const Chat =({socket, username, room}) => { //Define un componente funcional llamado Chat, que recibe tres propiedades (socket, username y room) desde su componente padre.
    const[currentMessage, setCurrentMessage] =useState("") //Declara un estado currentMessage utilizando useState, que almacenará el mensaje actual que el usuario está escribiendo en el chat.
    const[messagesList, setmessagesList] =useState([]) // Declara un estado messagesList utilizando useState, que almacenará la lista de mensajes del chat.
    const sendMessage = async () =>{ //Define una función sendMessage que se ejecutará cuando el usuario envíe un mensaje. Esta función verifica si el nombre de usuario y el mensaje no están vacíos, y luego emite un evento "send_message" al servidor con la información del mensaje.
        if(username && currentMessage){ 
            const info = {
                message: currentMessage,
                room,
                autor: username,
                time:  new Date(Date.now()).getHours()+":"+new Date().getMinutes(),
            }
            await socket.emit("send_message", info)
            setmessagesList((list)=>[...list,info]);
            setCurrentMessage ("")
        }
    }

    useEffect(()=>{ //para suscribirse al evento "receive_message" cuando el componente se monta y desuscribirse de él cuando se desmonta. Esto garantiza que el componente escuche los mensajes entrantes del servidor de socket.
        const messageHandle = (data) => { 
            setmessagesList((list)=>[...list,data]);   
        }
        socket.on("receive_message",messageHandle);
        return () => socket.off("receive_message",messageHandle);
    }, [socket])
    return ( //Define el cuerpo del componente Chat, que incluye la estructura del chat con los mensajes, el área de entrada de texto y el botón de enviar mensaje. 
        <Container >
            <Card fluid> {/*Define un componente de tarjeta que se extiende para llenar su contenedor.*/}
                <CardContent header={`Chat en vivo | Sala:${room}`} /> {/*Muestra el encabezado del chat con el nombre de la sala.*/}
                <ScrollToBottom> {/*Envuelve el contenido del chat para que se desplace automáticamente hacia abajo cuando se agreguen nuevos mensajes.*/}
                <CardContent style={{height:"400px", padding:"5px"}}> {/*Define el área de contenido del chat con una altura específica y un relleno.*/}
                    {
                        messagesList.map((item,i)=>{ //Mapea la lista de mensajes para mostrar cada uno de ellos en el chat.
                            return (
                            <span key = {i}>
                                <Message style ={{textAlign:username === item.autor?'right':'left'}}
                                success ={username === item.autor}
                                info ={username != item.autor}
                                >
                                    <MessageHeader>{item.message}</MessageHeader>
                                    <p>
                                    Enviado por: <strong>{item.autor}</strong>, a las <i>{item.time}</i>
                                    </p>  
                                </Message>
                                <Divider/>
                            </span>
                            );
                        })
                    }
                </CardContent>
                </ScrollToBottom>
                <CardContent extra>
                <Form>
                    <FormField>
                    <div className="ui action input">
                        <input 
                        value ={currentMessage}
                          type="text" 
                          placeholder="Mensaje..."
                        onChange={e => setCurrentMessage(e.target.value)} //Define un campo de entrada de texto donde los usuarios pueden escribir su mensaje y actualiza el estado currentMessage al cambiar el contenido del campo de entrada.
                        onKeyPress ={(e) =>{
                            if(e.key==="Enter") {sendMessage()}
                        }
                        }
                        />
                    <button type="button" onClick={()=> sendMessage()} className="ui teal icon right labeled button"> {/*Define un botón de enviar que llama a la función sendMessage cuando se hace clic en él.*/}
                    <Icon name='send'/>
                    Enviar
                    </button>
                    </div>
                    </FormField>
                </Form>
                </CardContent>
            </Card>
        </Container>
    )
}
export default Chat //Exporta el componente Chat para que pueda ser importado y utilizado en otros archivos.