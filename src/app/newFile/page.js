"use client";

import React, { useState } from "react";
import Tesseract from "tesseract.js";
import styles from "./page.module.css";
import { createFile } from "@/services/fileService";

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [ocrResult, setOcrResult] = useState("");
  const [formattedResult, setFormattedResult] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setOcrResult("");
    setFormattedResult("");
  };

  const handleProcessOCR = async () => {
    setAnswer("");
    setFormattedResult("");
    setQuestion("");

    if (!file) {
      alert("Por favor, selecione um arquivo antes de continuar.");
      return;
    }

    setIsProcessing(true);

    try {
      // Realiza o OCR
      const { data } = await Tesseract.recognize(file, "por", {
        logger: (info) => console.log(info),
      });

      const cleanedText = data.text.replace(/\n+/g, " ").trim();
      setOcrResult(data.text);
      setFormattedResult(cleanedText);

      // Envia o texto extraído para o banco
      await saveTextToDatabase(cleanedText);
    } catch (error) {
      alert("Erro ao processar OCR.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  const jwt = require('jsonwebtoken'); 
  const saveTextToDatabase = async (text) => {
    try {    
      
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("userId não encontrado. Faça login novamente.");
        return;
      }     

      const { data, status } = await createFile(text, userId);
      if (status >= 200) {
        // Login bem-sucedido
        console.log("Arquivo cadastrado com sucesso")
      }
    } catch (error) {
      // console.error("Erro ao salvar texto no banco:", error);
      
    }
  };

  const handleQuestionSubmit = async () => {
    if (!question.trim()) {
      alert("Digite uma pergunta antes de enviar.");
      return;
    }

    try {
      const response = await axios.post("/api/llm", {
        prompt: `Texto extraído: ${formattedResult}\nPergunta: ${question}`,
      });

      setAnswer(response?.data?.result || "Nenhuma resposta encontrada.");
    } catch (error) {
      console.error("Erro ao enviar pergunta:", error);
      alert("Erro ao buscar resposta.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enviar Arquivo e Perguntar ao LLM</h1>

      <div className={styles.formContainer}>
        {/* Campo de Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.inputFile}
        />

        {/* Botão para processar OCR */}
        <button
          onClick={handleProcessOCR}
          className={styles.submitButton}
          disabled={isProcessing}
        >
          {isProcessing ? "Processando..." : "Processar OCR"}
        </button>

        {/* Exibição do resultado OCR */}
        {formattedResult && (
          <div className={styles.ocrResultContainer}>
            <h4>Texto OCR Extraído:</h4>
            <textarea
              value={formattedResult}
              readOnly
              className={styles.resultText}
            />

            {/* Campo para fazer perguntas */}
            <div className={styles.questionContainer}>
              <input
                type="text"
                placeholder="Faça uma pergunta sobre o texto extraído"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className={styles.inputQuestion}
              />
              <button
                onClick={handleQuestionSubmit}
                className={styles.submitQuestionButton}
              >
                Enviar Pergunta
              </button>
            </div>

            {/* Resposta do LLM */}
            {answer && (
              <div className={styles.answerContainer}>
                <h4>Resposta da LLM:</h4>
                <p>{answer}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
