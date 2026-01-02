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
import Layout from './components/layout/Layout.jsx';
import Menu from './pages/menu/Menu.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/menu' element={<Menu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
