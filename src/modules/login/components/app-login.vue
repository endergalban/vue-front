<template>
  <v-col
    cols="12"
    sm="8"
    md="4"
  >
    <v-card class="elevation-12">
      <v-toolbar
        color="primary"
        dark
        flat
      >
        <v-toolbar-title>Login form</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Login"
            name="login"
            prepend-icon="mdi-account"
            type="text"
            v-model.trim="$v.loginRequestData.email.$model"
          ></v-text-field>

          <v-text-field
            id="password"
            label="Password"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            v-model.trim="$v.loginRequestData.password.$model"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :disabled="$v.loginRequestData.$invalid || loading"
          @click="loginRequest()"
        >Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { required, email, minLength } from 'vuelidate/lib/validators';
import mixin from '@/common/services/mixin';

export default {
  name: 'AppLogin',
  mixins: [mixin],
  data() {
    return {
      vista: null,
      loginRequestData: {
        email: '',
        password: '',
        remember: null,
      },
    };
  },
  validations: {
    loginRequestData: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  created() {
    this.init();
  },
  computed: {
    ...mapState('login', { token: 'token', error: 'error', loading: 'loading' }),
  },
  methods: {
    ...mapActions('login', [
      'authLoginAction',
      'authLogoutAction',
      'getCurrentUserAction',
    ]),
    async loginRequest() {
      try {
        this.loadBar(true);
        await this.authLoginAction(this.loginRequestData);
        this.vista = 1;
        this.$router.push('/dashboard');
      } catch {
        let error = '';
        if (this.error.response
          && (this.error.response.status === 422 || this.error.response.status === 401)
        ) {
          error = 'Las credenciales ingresadas son inválidas';
        }
        this.notify({ text: error, color: 'error' });
      } finally {
        this.loadBar(false);
      }
    },
    async init() {
      if (this.token) {
        this.loadBar(true);
        try {
          this.$router.push('/dashboard');
        } catch {
          localStorage.removeItem('token');
        } finally {
          this.loadBar(false);
        }
      }
    },
  },
};
</script>
