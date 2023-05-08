import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './components/Home.jsx'
import './index.css'
import Viagem from './Viagem.jsx'
import Carregando from './Carregando.jsx'
import Motorista from './Motorista.jsx'


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    
  },
  {
    path: "home",
    element: <Home/>,
  },
  {
    path: "viagem",
    element: <Viagem/>,
  },
  {
    path: "carregando",
    element: <Carregando/>,
  },
  {
    path: "motorista",
    element: <Motorista/>,
  }
  
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
