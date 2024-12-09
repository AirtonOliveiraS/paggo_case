import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signIn`, { email, password });
    return {
      data: response.data,   // Dados da resposta
      status: response.status, // Código de status HTTP
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Erro ao tentar fazer login"
    );
  }
};
