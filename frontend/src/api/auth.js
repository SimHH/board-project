import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/user',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginApi = (data) => API.post('/login', data);
export const registerApi = (data) => API.post('/register', data)
export const socialLoginApi = (data) => API.post("/social_Login", data)
export const authMe = () => API.get("/authMe");