import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.athleti.fi/v1/',
  headers: {
    Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
  },
});

export default axiosClient;
