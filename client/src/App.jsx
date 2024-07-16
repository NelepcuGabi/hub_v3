import React from 'react';
import "./App.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './pages/Dashboard';
import { Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext.jsx";

const App = () => {
  const{isAuthenticated} = useAuth();

  return <Router>
    <Routes>
      <Route path = '/' element={ !isAuthenticated ? <Register/> : <Navigate to ='/dashboard' />}></Route>
      <Route path = '/login' element={ !isAuthenticated ? <Login/> : <Navigate to ='/dashboard' />} />
      <Route path = '/dashboard' element={<Dashboard />} />
    </Routes>
  </Router>;
};

export default App;