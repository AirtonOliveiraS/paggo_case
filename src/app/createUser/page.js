"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "../../services/userService";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./page.module.css";

export default function UserCreate() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();

    if (!email || !senha || !name) {
      setError("Preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      console.log("Enviando dados de cadastro...");
      const response = await createUser(name, email, senha);

      console.log("Resposta do servidor:", response);

      if (response.status >= 200) {
        setError("");
        setSuccessMessage("Usuário criado com sucesso!");
        router.push("/");
      } else {
        setError("Erro ao criar usuário");
      }
    } catch (error) {
      console.error("Erro ao tentar criar usuário", error);
      setError("Erro ao tentar criar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro de Usuário</h1>
      <form onSubmit={handleCreate} className={styles.form}>
        <input
          type="text"
          placeholder="Digite seu Nome"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setError("");
          }}
          className={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}


        <Button
          Text={loading ? "Carregando..." : "Cadastrar"}
          onClick={handleCreate}
          className={styles.button}
        />
      </form>

      <p className={styles.signup}>
        Ja tem uma conta?{" "}
        <span className={styles.link} onClick={() => router.push("/")}>
          Login
        </span>
      </p>
    </div>
  );
}
