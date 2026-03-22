const axios = require('axios');

const instance = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
});

module.exports = instance;