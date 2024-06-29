import React from 'react' //Importa la biblioteca React, que permite la creación de componentes de interfaz de usuario interactivos.
import ReactDOM from 'react-dom/client' //Importa el módulo ReactDOM del cliente, que proporciona métodos para renderizar componentes React en el DOM.
import App from './App.jsx' //Importa el componente principal de la aplicación desde el archivo App.jsx.
import './index.css' //Importa un archivo CSS llamado index.css que contiene estilos para la aplicación.
import 'semantic-ui-css/semantic.min.css' //Importa el archivo CSS de Semantic UI, que proporciona estilos predefinidos para los componentes Semantic UI.
ReactDOM.createRoot(document.getElementById('root')).render( //Utiliza el método createRoot de ReactDOM para crear un "root" (raíz) de la aplicación en el elemento HTML con el ID root y luego renderiza el contenido dentro de este root.
  <React.StrictMode> {/*Inicia el modo estricto de React, que activa algunas verificaciones adicionales y advertencias útiles para ayudar a encontrar problemas en la aplicación.*/}
    <App /> {/*Renderiza el componente App, que es el componente principal de la aplicación.*/}
  </React.StrictMode>, //Finaliza el modo estricto de React.
)
