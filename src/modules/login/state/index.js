import { parseItem } from '../../../common/services/action-utils';
import * as services from '../services';

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    token: JSON.parse(localStorage.getItem('token')),
    current: null,
    error: null,
    loading: null,
  },
  mutations: {
    setToken(state, login) {
      state.token = login;
    },
    setCurrentUser(state, payload) {
      state.current = payload;
    },
    setError(state, error) {
      state.error = error;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async getCurrentUserAction({ commit }) {
      commit('setLoading', true);
      try {
        const response = await services.getCurrentUser();
        const data = parseItem(response, 200);
        commit('setCurrentUser', data);
        return data;
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async authLoginAction({ commit }, loginRequestData) {
      commit('setLoading', true);
      try {
        const response = await services.authLogin(loginRequestData);
        const data = parseItem(response, 200);
        localStorage.setItem('token', JSON.stringify(data.access_token));
        commit('setToken', data.access_token);
        return data.access_token;
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async authLogoutAction({ commit }) {
      commit('setLoading', true);
      try {
        const response = await services.authLogout();
        const data = parseItem(response, 200);
        localStorage.removeItem('token');
        commit('setCurrentUser', null);
        commit('setToken', null);
        return data;
      } catch (error) {
        localStorage.removeItem('token');
        commit('setToken', null);
        throw new Error(error);
      } finally {
        commit('setLoading', false);
      }
    },
  },
  getters: {
    token: (state) => state.token,
  },
};
