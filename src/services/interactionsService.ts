import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const createInteraction = async (question: string,answer: string, userId: string) => {
  try {
    // Recuperando o token do localStorage
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/interaction`,
      { question, answer, userId },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", // Configurando Bearer Token
        },
      }
    );

    return {
      data: response.data, // Dados da resposta
      status: response.status, // Código de status HTTP
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Erro ao tentar Criar Arquivo"
    );
  }
};
