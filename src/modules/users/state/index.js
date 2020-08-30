import * as services from '../services';
import { parseItem, parseList } from '../../../common/services/action-utils';
const pageSize = process.env.VUE_APP_RECORDS_PER_PAGES;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    collection: null,
    data: null,
    modules: null,
    error: null,
    loading: false,
  },
  mutations: {
    getUsers(state, payload) {
      state.collection = payload;
    },
    getUser(state, payload) {
      state.data = payload;
    },
    addUser(state, payload) {
      state.data = payload;
    },
    updateUser(state, payload) {
      state.data = payload;
    },
    deleteUser(state, payload) {
      state.data = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    addModules(state, payload) {
      state.modules = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async getUsersAction({ commit }, payload = { page: 1, pageSize: pageSize, filters: '' }) {
      commit('setLoading', true);
      try {
        const response = await services.getUsers(payload);
        const data = parseList(response);
        commit('getUsers', data);
        return data;
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async getUserAction({ commit }, payload) {
      commit('setLoading', true);
      try {
        const response = await services.getUser(payload);
        const data = parseItem(response, 200);
        commit('getUser', data);
        return data;
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async deleteUserAction({ commit }, payload) {
      commit('setLoading', true);
      try {
        const response = await services.deleteUser(payload);
        const data = parseItem(response, 200);
        commit('deleteUser', data);
        return data;
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async updateUserAction({ commit }, payload) {
      commit('setLoading', true);
      try {
        const response = await services.updateUser(payload);
        const data = parseItem(response, 200);
        commit('updateUser', data);
        return data;
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async updatePasswordUserAction({ commit }, payload) {
      commit('setLoading', true);
      try {
        const response = await services.updatePasswordUser(payload);
        return parseItem(response, 200);
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async updateEstadoUserAction({ commit }, payload) {
      commit('setLoading', true);
      try {
        const response = await services.updateEstadoUser(payload);
        const data = parseItem(response, 200);
        commit('updateUser', data);
        return data;
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async addUserAction({ commit }, payload) {
      commit('setLoading', true);
      try {
        const response = await services.addUser(payload);
        const data = parseItem(response, 200);
        commit('addUser', data);
        return data;
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async addUserModulesAction({ commit }, payload) {
      commit('setLoading', true);
      try {
        const response = await services.addUserModules(payload);
        const data = parseItem(response, 200);
        return data;
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async getModulesAction({ commit }) {
      commit('setLoading', true);
      try {
        const response = await services.getModules();
        const data = parseList(response);
        commit('addModules', data);
        return data;
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      } finally {
        commit('setLoading', false);
      }
    },
  },
};
