import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const createUser = async (name: string, email: string, password: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/users`,
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Incluindo o token no cabeçalho
        },
      }
    );

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    console.error("Erro no serviço de criação de usuário:", error);
    throw error;
  }
};