import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from "./components/login/login.jsx";
import Taskmanager from './components/Taskmanager/taskmanager.jsx';

const App = () => {
  //Comprobamos si el usuario esta logeado
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //Comprobamos la información del usuario
  const [userData, setUserData] = useState(null);

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUserData(data);
  };

//Rutas de la aplicación
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/taskmanager" element={<TaskManagerWrapper isLoggedIn={isLoggedIn} userData={userData} onLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
};

//Wrapper para el TaskManager
const TaskManagerWrapper = ({ isLoggedIn, userData, onLogin }) => {
  const location = useLocation();
  const data = location.state?.data || userData;

  console.log('Data:', data);

  return isLoggedIn ? <Taskmanager data={data} /> : <Login onLogin={onLogin} />;
};
//Renderizamos la aplicación
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);