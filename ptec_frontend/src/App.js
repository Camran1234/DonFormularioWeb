import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import './styles/App.css';
import './styles/Admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from './pages/Register'
import Login from './pages/Login';
import MenuAdmin from './pages/admin/MenuAdmin'
import EncuestaCrud from './pages/admin/EncuestaCRUD'
import Encuesta from './pages/admin/Encuesta'
import VisualizadorResultados from './pages/admin/VisualizadorResultados'
import Dashboard from './pages/admin/Dashboard'
import MenuUsuario from './pages/user/MenuUsuario'
import EncuestaConstructor from './pages/admin/EncuestaConstructor'

function App() {
  return (


    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<MenuAdmin />} />
          <Route path="/encuestasCrud" element={<EncuestaCrud />} />
          <Route path="/constructor" element={<EncuestaConstructor />} />
          <Route path="/encuesta/:idEncuesta" element={<Encuesta />} />
          <Route path="/resultados" element={<VisualizadorResultados />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuario" element={<MenuUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
