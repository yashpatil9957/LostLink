import axios from "axios";

//creating Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;