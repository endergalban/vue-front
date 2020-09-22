<template>
  <v-col
    cols="12"
    sm="8"
    md="4"
  >
    <v-card class="elevation-12">
      <v-toolbar
        color="white"
        flat
      >
        <v-toolbar-title>{{ appConstants.appName }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Email"
            name="email"
            type="text"
            v-model.trim="$v.loginRequestData.email.$model"
            outlined
          />

          <v-text-field
            id="password"
            label="Password"
            name="password"
            type="password"
            v-model.trim="$v.loginRequestData.password.$model"
            outlined
          />
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
import constants from '@/common/constants';
import { required, email, minLength } from 'vuelidate/lib/validators';
import mixin from '@/common/services/mixin';

export default {
  name: 'AppLogin',
  mixins: [mixin],
  data() {
    return {
      appConstants: constants,
      loading: false,
      loginRequestData: {
        email: 'endergalban@sda.com',
        password: 'qwqwqwq',
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
    ...mapState('login', { token: 'token', error: 'error' }),
  },
  methods: {
    ...mapActions('login', [
      'authLoginAction',
      'authLogoutAction',
      'getCurrentUserAction',
    ]),
    async loginRequest() {
      try {
        this.loadBar(this.loading);
        await this.authLoginAction(this.loginRequestData);
        this.$router.push('/dashboard');
      } catch (error) {
        // console.log(this.error);
        console.log(error);
        // this.notify({ text: error.response.status, color: 'error' });
      } finally {
        this.loadBar(false);
      }
    },
    async init() {
      localStorage.removeItem('token');
    },
  },
};
</script>
