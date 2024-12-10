"use client"; 
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; 
import styles from './page.module.css'; 
import { FaRegImage, FaFileAlt  } from "react-icons/fa";
import { signIn } from "@/services/authService";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  


  
  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      const { data, status } = await signIn(email, senha);

      if (status >= 200) {
        
        localStorage.setItem("token", data.access_token); // Salva o token
        localStorage.setItem("userId", data.userId);// Salva o userId
        router.push("/newFile"); // Redireciona para /newFile
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao tentar fazer login:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
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
