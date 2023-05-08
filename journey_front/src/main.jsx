import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/homePage'
import TripPage from './pages/TripPage'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    
  },
  {
    path: "trip",
    element: <TripPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
