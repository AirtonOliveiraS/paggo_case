"use client";

import React, { useState, useEffect } from "react";
import mockInteractions from "../data/mockInteractions";
import styles from "./page.module.css";
import { getinteractions } from "@/services/interactionsService";
import { useRouter } from "next/navigation";

export default function MyInteractions() {
  const router = useRouter();
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data, status } = await getinteractions();

        if (status >= 200) {
          
          const formattedFiles = data.map((item) => ({
            question: item.question,
            answer: item.answer,
            date: new Date(item.createdAt).toLocaleDateString(), 
          }));
          setInteractions(formattedFiles);
          console.log(formattedFiles)
        }
      } catch (error) {
        console.error("Erro ao buscar arquivos:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Minhas Interações</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Pergunta</th>
            <th>Resposta</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {interactions.map((interaction, index) => (
            <tr key={index}>
              <td>{interaction.question}</td>
              <td>{interaction.answer}</td>
              <td>{interaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
      onClick={() => router.push("/newFile")} 
      className={styles.submitButton}
    >
      Voltar
    </button>
    </div>
  );
}
