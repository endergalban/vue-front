import httpClient from '../../../common/services/http-client';
const maxRequest = process.env.VUE_APP_MAX_REQUEST;

const getUsers = async (payload) => httpClient.get(
  `/users?page=${payload.page}&page_size=${payload.pageSize}${payload.filters}`,
);

const getUser = async (payload) => httpClient.get(`/users/${payload}`);

const deleteUser = async (payload) => httpClient.delete(`/users/${payload.id}`);

const updateUser = async (payload) => httpClient.put(`/users/${payload.id}`, payload);

const updatePasswordUser = async (payload) => httpClient.put(`/users/${payload.id}/password`, payload);

const updateEstadoUser = async (payload) => httpClient.put(`/users/${payload.id}/state`, payload);

const addUser = async (payload) => httpClient.post('/users', payload);

const getModules = async () => httpClient.get(`/modules?page=1&page_size=${maxRequest}&enabled=true`);

const addUserModules = async (payload) => httpClient.post(`/users/${payload.user_id}/modules`, payload);

export {
  addUserModules,
  getUsers,
  getUser,
  getModules,
  deleteUser,
  updateUser,
  updatePasswordUser,
  updateEstadoUser,
  addUser,
};
