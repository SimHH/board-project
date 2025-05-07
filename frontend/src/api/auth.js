import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/user',
});

export const login = (data) => API.post('/login', data);
export const register = (data) => API.post('/register', data)
export const socialLogin = (data) => API.post("/social_Login", data)