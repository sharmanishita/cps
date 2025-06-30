import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL|| "http://localhost:5000/api", // Default to local server if env variable is not set
  withCredentials: true, // if cookies are used
});

export default api;
