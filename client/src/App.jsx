import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/NavBar.jsx';
import Proiecte from './pages/Proiecte.jsx'
import { useAuth } from "./contexts/AuthContext.jsx";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
   
    <Router>
      <Navbar/>
      <Routes>
        {/* Redirect from root path to /home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Define routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/proiecte" element={<Proiecte/>}/>
      </Routes>
    </Router>

   

  );
};

export default App;
