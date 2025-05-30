import axios from 'axios';

// Create an instance for your Kubernetes API
export const kubernetesApi = axios.create({
  baseURL: 'http://localhost:26913/kabrilla-server/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});