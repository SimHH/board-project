import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/post',
});

export const write_board = (data) =>
  API.post('/save_post', data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const list_board = (page = 1, limit = 10, search = "") =>
  API.get(`/posts?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);

export const getPost = (id) => API.get(`/postDetail/${id}`);

export const updatePost = (postId, data) =>
  API.put(`/${postId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

export const deletePost = (postId) =>
  API.delete(`/${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

export const secureDownload = (filename) =>
  API.get(`/secure-download/${filename}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    responseType: 'blob',
  });