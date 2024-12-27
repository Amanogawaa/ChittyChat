import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async (url: string, config = {}) => {
  const response = await api.get(url, config);
  return response.data;
};

export const post = async (url: string, data = {}, config = {}) => {
  const response = await api.post(url, data, config);
  return response.data;
};

export default api;
