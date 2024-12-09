"use client";

import React, { useState, useEffect } from "react";
import mockInteractions from "../data/mockInteractions";
import styles from "./page.module.css";
import { getinteractions } from "@/services/interactionsService";

export default function MyInteractions() {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data, status } = await getinteractions();
        
        if (status === 200) {
          // Transforme os dados para corresponder ao formato desejado
          const formattedFiles = data.map((item) => ({
            question: item.question,
            answer: item.answer,
            date: new Date(item.createdAt).toLocaleDateString(), // Formata a data
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

      {interactions.length === 0 ? (
        <p className={styles.error}>Nenhuma interação encontrada.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Pergunta</th>
              <th>Resposta</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {interactions.map((interaction) => (
              <tr key={interaction.date}>
                <td>{interaction.question}</td>
                <td>{interaction.answer}</td>
                <td>{new Date(interaction.date).toLocaleDateString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
