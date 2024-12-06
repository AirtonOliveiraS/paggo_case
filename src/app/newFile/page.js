"use client"; // Necessário para usar hooks no App Router

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// CSS Modules
import styles from "./page.module.css";

export default function NewFile() {
  const router = useRouter();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Por favor, selecione um arquivo para enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Arquivo enviado com sucesso.");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
      alert("Erro ao enviar o arquivo.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enviar Arquivo</h1>
      
      <div className={styles.formContainer}>
        <input
          type="file"
          onChange={handleFileChange}
          className={styles.inputFile}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          Enviar Arquivo
        </button>
        <button
          type="button"
          onClick={() => router.push("/myFiles")}
          className={styles.myFilesButton}
        >
          Meus Arquivos
        </button>
      </div>
    </div>
  );
}
