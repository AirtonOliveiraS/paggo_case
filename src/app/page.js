"use client"; // Necessário para usar hooks no App Router

import React, { useState } from "react";
import axios from "axios"; // Para fazer requisições HTTP
import { useRouter } from "next/navigation"; // Navegação no App Router

export default function Login() {
  const router = useRouter(); // Para redirecionar o usuário

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  // Função para realizar o login
  const handleLogin = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      console.log("Dados enviados:", { email, senha });
      const res = 1
      // Fazendo a requisição para o backend
      const response = await axios.post(
        "http://localhost:8000/users/login",
        { email, senha },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Resposta recebida:", response);

      if (res ===1 ) {
        // Caso a autenticação seja bem-sucedida
        router.push("/newFile"); // Redireciona para a rota "/users"
      } else {
        setError("Email ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      setError("Erro ao tentar fazer login, tente novamente.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
          style={{ padding: "10px", fontSize: "16px" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Entrar
        </button>
      </form>
      <p>
        Não tem uma conta?{" "}
        <a href="/newFile" style={{ color: "#0070f3", textDecoration: "none" }}>
          Registre-se
        </a>
      </p>
    </div>
  );
}
