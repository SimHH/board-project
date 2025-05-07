import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/post',
});

export const write_board = (data) => API.post('/save_post', data, {
  header : {
    "Content-Type": "multipart/form-data",
  },
});
export const list_board = () => API.get("/list");
export const getPost = (id) => API.get(`/postDetail/${id}`);