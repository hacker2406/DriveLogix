import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import {AuthProvider} from "./context/AuthContext"
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute/>}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>

        
      </AuthProvider>
    </Router>
  );
}

export default App;
