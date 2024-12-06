"use client"; // Necessário para usar hooks no App Router

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Componentes internos
import Input from "../../components/Input";
import Button from "../../components/Button";


// Estilos CSS com CSS Modules
import styles from "./page.module.css";

export default function UserCreate() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();
    
    if (!email || !senha || !name || !type) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      console.log('Dados enviados:', { name, email, type, senha });

      const response = await axios.post(
        "http://localhost:8000/users/create",
        { name, email, type, senha },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log('Resposta recebida:', response);

      if (response.status === 200) {
        console.log("Usuário criado com sucesso");
        router.push("/users");
      } else {
        setError("Erro ao criar usuário");
      }
    } catch (error) {
      console.error("Erro ao tentar fazer cadastro:", error);
      setError("Erro ao tentar fazer cadastro, tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro de Usuário</h1>
      <form onSubmit={handleCreate} className={styles.form}>
        <Input
          type="text"
          placeholder="Digite seu Nome"
          value={name}
          onChange={(e) => [setName(e.target.value), setError("")]}
          className={styles.input}
        />
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
          className={styles.input}
        />
        <Input
          type="text"
          placeholder="Tipo de Usuário"
          value={type}
          onChange={(e) => [setType(e.target.value), setError("")]}
          className={styles.input}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
          className={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button
          Text="Cadastrar"
          onClick={handleCreate}
          className={styles.button}
        />
      </form>
    </div>
  );
}
