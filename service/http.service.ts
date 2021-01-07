import axios from 'axios';

export const AppHttp = axios.create({
    baseURL: 'http://localhost:9000',
    // timeout: 1000,
});