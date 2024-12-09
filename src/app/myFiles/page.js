"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function MyFiles() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Dados falsos para teste
    const mockFiles = [
      { file: "documento1.pdf", date: "2024-12-01" },
      { file: "imagem2.png", date: "2024-12-05" },
      { file: "relatorio_final.docx", date: "2024-12-08" },
    ];
    setFiles(mockFiles);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Meus Arquivos</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Arquivo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{file.file}</td>
              <td>{file.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
