import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/Register/Register';
import Taskmanager from './components/Taskmanager/taskmanager';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/taskmanager" element={<Taskmanager/>} />
      </Routes>
    </Router>
  );
}

export default App;
