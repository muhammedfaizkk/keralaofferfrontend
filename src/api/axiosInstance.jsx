import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://keralaoffersbackend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
