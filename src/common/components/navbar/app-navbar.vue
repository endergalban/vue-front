<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue darken-3"
    dark
  >
    <v-app-bar-nav-icon @click.stop="setMiniVariant"></v-app-bar-nav-icon>
    <v-toolbar-title
      style="width: 220px"
      class="ml-0 pl-4"
    >
      <span class="hidden-sm-and-down">{{ appName }}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <span>{{ this.userEmail }}</span>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon
          v-bind="attrs"
          v-on="on"
          @click="logout"
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <span>{{ this.tLogout }}</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import constants from '@/common/constants';

export default {
  name: 'AppNavBar',
  props: {
    lang: {
      type: String,
      required: true,
    },
    miniVariant: {
      type: Boolean,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    appName: constants.appName,
  }),
  computed: {
    tLogout() {
      return constants.langs[this.lang].logout;
    },
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
    setMiniVariant() {
      this.$emit('setMiniVariant', !this.miniVariant);
    },
  },
};
</script>
