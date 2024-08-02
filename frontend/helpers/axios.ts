import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://rajbeer.fun',
});

export default axiosClient;