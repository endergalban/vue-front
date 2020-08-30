import httpClient from '../../../common/services/http-client';

const authLogin = async (payload) => httpClient.post('/auth/login', payload);

const authLogout = async () => httpClient.get('/auth/logout');

const getCurrentUser = async () => httpClient.get('/users/current');

export {
  authLogin,
  authLogout,
  getCurrentUser,
};
