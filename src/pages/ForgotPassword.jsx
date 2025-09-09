import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend(e) {
    e.preventDefault();
    setMessage("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(u => u.email === email);

    if (!foundUser) {
      setMessage("E-mail não encontrado no sistema!");
      return;
    }

    setSent(true);
    setMessage(`Um link de recuperação foi enviado para ${email}.`);
  }

  return (
    <div className="container">
      <h2>Recuperar Senha</h2>

      {!sent ? (
        <form onSubmit={handleSend}>
          <input
            type="email"
            placeholder="Digite seu e-mail cadastrado"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar link de recuperação</button>
        </form>
      ) : (
        <div style={{ marginTop: "15px", color: "green" }}>
          {message}
        </div>
      )}

      {message && !sent && (
        <div style={{ marginTop: "10px", color: "red" }}>{message}</div>
      )}

      <Link to="/login" style={{ display: "block", marginTop: "10px" }}>
        Voltar ao login
      </Link>
    </div>
  );
}
