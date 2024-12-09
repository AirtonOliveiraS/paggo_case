"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getFiles } from "@/services/fileService";
import { useRouter } from "next/navigation";

export default function MyFiles() {
  const router = useRouter();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data, status } = await getFiles();

        if (status === 200) {
          // Transforme os dados para corresponder ao formato desejado
          const formattedFiles = data.map((item) => ({
            file: item.text,
            date: new Date(item.createdAt).toLocaleDateString(), // Formata a data
          }));
          setFiles(formattedFiles);
        }
      } catch (error) {
        console.error("Erro ao buscar arquivos:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Meus Arquivos</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Texto da Imagem</th>
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
      <button
      onClick={() => router.push("/newFile")} 
      className={styles.submitButton}
    >
      Voltar
    </button>
    </div>
  );
}
