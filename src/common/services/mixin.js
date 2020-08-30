const mixin = {
  methods: {
    loadBar(state = false) {
      this.$store.commit('setLoading', state);
    },
    notify(payload = { text: '', color: 'info' }) {
      this.$store.commit('setSnackbar', payload);
    },
    parseSuccess(text = 'Operación realizada exitosamente') {
      this.notify({ text, color: 'success' });
    },
    parseError(payload) {
      this.loadBar(false);
      let errorResponse = '';
      if (payload.message) {
        errorResponse = payload.message;
      }
      if (payload.response) {
        if (payload.response.status === 401) {
          errorResponse = 'Su sesión ha expirado, para continuar debe iniciar sesión.';
          this.$router.push('/login');
        }
        if (payload.response.status === 422) {
          // const objetoError = payload.response.data.errors;
          const errors = [];
          // for (const key of Object.keys(objetoError)) {
          //   objetoError[key].map((errorData) => errors.push(`<li>${errorData}</li>`));
          // }
          errorResponse = `<ul>${errors.join('')}</ul>`;
        }
      } else if (payload.request) {
        errorResponse = payload.request;
      } else {
        errorResponse = payload.message;
      }
      this.notify({
        text: errorResponse,
        title: 'Error',
        color: 'danger',
      });
    },
  },
};

export default mixin;
