import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:1337/api',
    timeout: 4000,
});

export default axiosInstance