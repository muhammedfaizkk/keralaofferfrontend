// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://keralaoffersbackend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Automatically add token from localStorage to Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('keralaoffertoken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
