import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from "./components/login/login.jsx";
import Taskmanager from './components/Taskmanager/taskmanager.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUserData(data);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/taskmanager" element={<TaskManagerWrapper isLoggedIn={isLoggedIn} userData={userData} onLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
};

const TaskManagerWrapper = ({ isLoggedIn, userData, onLogin }) => {
  const location = useLocation();
  const data = location.state?.data || userData;

  console.log('Data:', data);

  return isLoggedIn ? <Taskmanager data={data} /> : <Login onLogin={onLogin} />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);