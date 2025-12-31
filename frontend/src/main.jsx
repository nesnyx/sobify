import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import Menu from './pages/menu/Menu.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route element={<Sidebar />}>
          <Route path="/" element={<App />} />
          <Route path='/menu' element={<Menu/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
