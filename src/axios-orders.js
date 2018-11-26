import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-order-9e6d9.firebaseio.com/'
});

export default instance;