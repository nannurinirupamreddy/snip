import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://snip-backend-d8yy.onrender.com',
});

export default instance;
