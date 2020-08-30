import * as services from '../services';
import { parseItem, parseList } from '../../../common/services/action-utils';
const pageSize = process.env.VUE_APP_RECORDS_PER_PAGES;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    collection: null,
    data: null,
    error: null,
    loading: false,
  },
  mutations: {
    setRecords(state, payload) {
      state.collection = payload;
    },
    setRecord(state, payload) {
      state.data = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async getRecordsAction({ commit }, payload = { page: 1, pageSize: pageSize, filters: '' }) {
      commit('setLoading', true);
      try {
        const response = await services.getRecords(payload);
        const data = parseList(response);
        commit('setRecords', data);
        return data;
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async getRecordAction({ commit }, payload) {
      commit('setLoading', true);
      try {
        const response = await services.getRecord(payload);
        const data = parseItem(response, 200);
        commit('setRecord', data);
        return data;
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async deleteRecordAction({ commit }, payload) {
      commit('setLoading', true);
      try {
        const response = await services.deleteRecord(payload);
        const data = parseItem(response, 200);
        return data;
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async getReportRecordAction({ commit }, payload) {
      commit('setLoading', true);
      try {
        const response = await services.getReportRecord(payload);
        const data = parseItem(response, 200);
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
