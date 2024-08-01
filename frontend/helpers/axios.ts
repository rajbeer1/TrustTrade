import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://trusttrade.onrender.com',
});

export default axiosClient;