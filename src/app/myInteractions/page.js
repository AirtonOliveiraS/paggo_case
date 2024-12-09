"use client";

import React, { useState, useEffect } from "react";
import mockInteractions from "../data/mockInteractions";
import styles from "./page.module.css";

export default function MyInteractions() {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    // Simula uma requisição carregando os dados do arquivo mock
    setInteractions(mockInteractions);
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
              <tr key={interaction.id}>
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
