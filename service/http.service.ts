import axios from 'axios';


export const AppHttp = axios.create({
    baseURL: 'http://localhost:4000/graphql',
    timeout: 1000,
    withCredentials: true,
});