import axios from 'axios';

 export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL|| "http://localhost:5000/api", // Default to local server if env variable is not set
  withCredentials: true, // if cookies are used
});
export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_BASE_URL || "http://localhost:5000/api", // Default to local server if env variable is not set
  withCredentials: true, // if cookies are used
});

