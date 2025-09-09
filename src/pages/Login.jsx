import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {IMaskInput} from "react-imask";

export default function Login({setLoggedUser}) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.user === user && u.password === password);

    if (!found) {
      setError("Usuário ou senha inválidos");
      return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(found));
    setLoggedUser(found);
    navigate("/home");
  }

  const banner = document.getElementById('cookie-banner');
  const button = document.getElementById('accept-cookies');
  

  return (
    <div className="container">
      <div className="logo">
        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png" alt="logo" />
        <span>LOGO</span>
      </div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <IMaskInput
        mask="000.000.000-00"
        value={user}
        placeholder="CPF"
        unmask={true}
        onAccept={(value)=> setUser(value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
        <button type="submit" style={{ marginBottom: "15px" }} >Login</button>
        <Link to="/register">Cadastrar</Link>
      </form>
    </div>
  );
}
