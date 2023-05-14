import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './components/Home.jsx'
import './index.css'
import Viagem from './Viagem.jsx'
import Carregando from './Carregando.jsx'
import NovaViagem from './NovaViagem.jsx'
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

import {
  createBrowserRouter,
  RouterProvider,
 
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
  // {
  //   path: "motorista",
  //   element: <Motorista/>,
  // },
  {
    path: "novaviagem",
    element: <NovaViagem/>,
  }
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Outlet/>
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
  </QueryClientProvider>
)
