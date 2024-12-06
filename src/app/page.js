"use client"; // Necessário para usar hooks no App Router

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; 
import styles from './page.module.css'; // Importando estilos CSS
import { FaRegImage, FaFileAlt  } from "react-icons/fa";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  // Função para fazer o login
  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      console.log("Dados enviados:", { email, senha });

      const response = 1; // Simulação de sucesso para testes

      if (response === 1) {
        router.push("/newFile");
      } else {
        setError("Email ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      setError("Erro ao tentar fazer login, tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
        <div className={styles.header}>
        <h1 className={styles.title}>Paggo OCR</h1>
        <FaFileAlt className={styles.icon} /> 
       
      </div>
      <h3 className={styles.subtitle}>Login</h3>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
        
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setError("");
          }}
          className={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} type="submit">Entrar</button>
      </form>
      <p className={styles.signup}>
        Não tem uma conta?{" "}
        <span className={styles.link} onClick={() => router.push("/createUser")}>
          Registre-se
        </span>
      </p>
    </div>
  );
}
