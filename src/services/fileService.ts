import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const createFile = async (text: string, userId: string) => {
  try {
    // Recuperando o token do localStorage
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/file`,
      { text, userId },
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

export const getFiles = async () => {
  try {
    
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/file/allfiles/?userId=${userId}`,
     
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", 
        },
      }
    );

    return {
      data: response.data, // Dados da resposta
      status: response.status, // Código de status HTTP
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Erro ao tentar Buscar Arquivos"
    );
  }
};

