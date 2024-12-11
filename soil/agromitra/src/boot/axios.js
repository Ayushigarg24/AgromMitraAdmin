// src/boot/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://sih-agromitra-new-server-psi.vercel.app', // Your API base URL
});

export default ({ app }) => {
  app.config.globalProperties.$axios = axiosInstance;
};

export { axiosInstance };
