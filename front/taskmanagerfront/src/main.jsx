import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from "./components/login/login.jsx"
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Login/>
  </StrictMode>,

)
