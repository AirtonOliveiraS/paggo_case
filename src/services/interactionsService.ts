import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const createInteraction = async (question: string,answer: string, userId: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/interaction`,
      { question, answer, userId },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", 
        },
      }
    );

    return {
      data: response.data, 
      status: response.status, 
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Erro ao tentar Criar Arquivo"
    );
  }
};

export const getinteractions = async () => {
  try {
    
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_URL}/interaction/allinteractions/?userId=${userId}`,
     
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", 
        },
      }
    );

    return {
      data: response.data, 
      status: response.status, 
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Erro ao tentar Buscar Interacoes"
    );
  }
};
