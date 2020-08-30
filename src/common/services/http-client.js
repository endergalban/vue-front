import axios from 'axios';

const config = {
  baseURL: process.env.VUE_APP_API,
};

const httpClient = axios.create(config);

const authInterceptor = (configInterceptor) => {
  const configRequest = configInterceptor;
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    configRequest.headers.Authorization = `Bearer ${token}`;
  }
  return configRequest;
};

httpClient.interceptors.request.use(authInterceptor);

httpClient.interceptors.response.use(
  (response) => response,
);

export default httpClient;
