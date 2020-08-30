<template>
  <v-app id="inspire" flat>
    <AppNavBar
      v-if="false"
      :lang="lang"
      :mini-variant="miniVariant"
      :user-email="userEmail"
      @setMiniVariant="(payload) => miniVariant = payload"
    />
    <AppSideBar
      v-if="false"
      :lang="lang"
      :menus="menus"
      :mini-variant="miniVariant"
      :user="user"
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
import AppNavBar from '@/common/components/navbar/app-navbar.vue';
import AppSideBar from '@/common/components/sidebar/app-sidebar.vue';
import AppSnackBar from '@/common/components/snackbar/app-snackbar.vue';

export default {
  components: {
    AppNavBar,
    AppSideBar,
    AppSnackBar,
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
      { icon: 'mdi-contacts', text: 'Contacts' },
      { icon: 'mdi-history', text: 'Frequently contacted' },
      { icon: 'mdi-content-copy', text: 'Duplicates' },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Labels',
        model: true,
        children: [
          { icon: 'mdi-plus', text: 'Create label' },
        ],
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'More',
        model: false,
        children: [
          { text: 'Import' },
          { text: 'Export' },
          { text: 'Print' },
          { text: 'Undo changes' },
          { text: 'Other contacts' },
        ],
      },
      { icon: 'mdi-cog', text: 'Settings' },
    ],
  }),
};
</script>
