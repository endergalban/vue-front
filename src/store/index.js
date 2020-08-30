import Vue from 'vue';
import Vuex from 'vuex';
import loginModule from '../modules/login/state';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: null,
    loading: false,
  },
  mutations: {
    setSnackbar(state, payload) {
      state.snackbar = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
  },
  modules: {
    login: loginModule,
  },
});
