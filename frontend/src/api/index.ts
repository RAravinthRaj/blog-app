import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

export const register = (data: RegisterData) => {
  const { confirmPassword, ...registerData } = data as any;

  return axios.post(`${API_URL}/signup`, registerData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const login = (data: SignInData) => {
  return axios.post(`${API_URL}/signin`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
