<template>
  <v-app id="inspire" flat>
    <AppLoader
      :active="loading"
    />
    :active="loading"
    <AppNavBar
      :lang="lang"
      :mini-variant="miniVariant"
      :user-email="userEmail"
      @setMiniVariant="(payload) => miniVariant = payload"
      @logout="logout"
    />
    <AppSideBar
      :lang="lang"
      :menus="menus"
      :mini-variant="miniVariant"
      :user="user"
      @redirect="redirect"
    />
    <AppSnackBar :lang="lang" />
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <router-view/>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import AppNavBar from '@/common/components/navbar/app-navbar.vue';
import AppLoader from '@/common/components/loader/app-loader.vue';
import AppSideBar from '@/common/components/sidebar/app-sidebar.vue';
import AppSnackBar from '@/common/components/snackbar/app-snackbar.vue';

export default {
  components: {
    AppNavBar,
    AppLoader,
    AppSideBar,
    AppSnackBar,
  },
  computed: {
    ...mapState(['loading']),
  },
  data: () => ({
    miniVariant: false,
    userEmail: 'endergalban@gmail.com',
    lang: 'es',
    user: {
      name: 'Ender Alberto Galban Rios',
      role: 'Admin',
    },
    menus: [
      {
        icon: 'mdi-home', name: 'Dashboard', url: 'dashboard', menus: [], model: true,
      },
      {
        icon: 'mdi-contacts',
        name: 'Users',
        url: 'user',
        menus: [{ icon: 'mdi-home', name: 'hola', url: 'hola' }],
        model: false,
      },
    ],
  }),
  methods: {
    logout() {
      console.log('logout');
    },
    redirect(payload) {
      console.log(payload);
      this.$router.push({ name: payload.url });
    },
  },
};
</script>
