import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signIn`, { email, password });
    return {
      data: response.data,   
      status: response.status, 
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Erro ao tentar fazer login"
    );
  }
};
