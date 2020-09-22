<template>
  <v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp"
    :mini-variant="miniVariant"
    app
  >
    <v-list dense>
      <v-list-item two-line :class="miniVariant" class="px-2">
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.role }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="py-2"></v-divider>
      <template v-for="item in menus">
            <v-list-group
              v-if="item.menus"
              :key="item.name"
              v-model="item.model"
              :prepend-icon="item.menus.length > 0
                ? (item.model ? 'mdi-chevron-up' : 'mdi-chevron-down')
                : item.icon"
              append-icon=""
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="(child, i) in item.menus"
                :key="i"
                link
              >
                <v-list-item-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ child.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item
              v-else
              :key="item.name"
              link
            >
              <v-list-item-action >
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppSideBar',
  props: {
    menus: {
      type: Array,
      required: true,
    },
    miniVariant: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    redirect(payload) {
      this.$emit('redirect', payload);
    },
  },
};
</script>
