import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://davur-restaurant-server.onrender.com/api',
});

export default axiosInstance