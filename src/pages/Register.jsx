import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {IMaskInput} from "react-imask";

export default function Register() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("As senhas não conferem");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find(u => u.user === user)) {
      setError("Usuário já cadastrado");
      return;
    }

    users.push({ name, user, password });
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/");
  }

  return (
    <div className="container-register">
      <div className="logo">
        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png" alt="logo" />
        <span>LOGO</span>
      </div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <IMaskInput
        mask="000.000.000-00"
        value={user}
        placeholder="CPF"
        unmask={true}
        onAccept={(value)=> setUser(value)}
        required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
        <button type="submit" style={{ marginBottom: "15px" }} >Cadastrar</button>
        <Link to="/">Login</Link>
      </form>
    </div>
  );
}
