import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'http://clock-in-ben-chu.herokuapp.com'
    : 'http://localhost:8080'
});

export default http;