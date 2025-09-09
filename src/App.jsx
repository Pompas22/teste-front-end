import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse (localStorage.getItem("loggedUser"))
  );


  return (
    <div className="app container fade-in">
      <Routes>
        <Route path="/" element={loggedUser ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}/>
        <Route path="/login" element={<Login setLoggedUser={setLoggedUser} />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={loggedUser ? <Home /> : <Navigate to="/login" replace />}/>
      </Routes>
    </div>
  );
}
