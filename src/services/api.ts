// Axios configuration with retry and delay handling

import axios from 'axios';
import axiosRetry from 'axios-retry';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Set timeout for requests
});

// Retry mechanism for handling 503 errors and other network issues
axiosRetry(api, {
  retries: 3, // Retry 3 times for failed requests
  retryDelay: axiosRetry.exponentialDelay, // Exponential backoff delay between retries
  retryCondition: (error) => {
    return error.response?.status === 503 || error.code === 'ECONNABORTED'; // Retry on 503 errors or network timeout
  },
});

export default api;
