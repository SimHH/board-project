import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/comments',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getComments = (postId) => API.get(`/${postId}`);
export const createComment = (postId, content) => API.post(`/${postId}`, { content });
export const updateComment = (commentId, content) => API.put(`/${commentId}`, { content });
export const deleteComment = (commentId) => API.delete(`/${commentId}`);