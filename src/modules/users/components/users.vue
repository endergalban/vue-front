<template>
  <span >
    <vs-row >
      <vs-col vs-lg="12">
        <AppUserList
          v-if="vista === 1"
          :loading="loading"
          :users="users"
          @filtrar="filtrar"
          @destroy="destroy"
          @changeState="changeState"
          @changePassword="changePassword"
          @create="create"
          @edit="edit"
          @editModules="editModules"
        />
        <AppUserDetail
          v-if="vista === 2"
          :loading="loading"
          @save="save"
          @volver="init"
        />
        <AppUserDetail
          v-if="vista === 3"
          :user="user"
          :loading="loading"
          @update="update"
          @volver="init"
        />
        <AppUserModule
          v-if="vista === 4"
          :user="user"
          :modules="modules"
          :loading="loading"
          @save="saveModules"
          @saveModules="saveModules"
          @volver="init"
        />
      </vs-col>
    </vs-row>
  </span>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import mixin from '@/common/services/mixin';
import AppUserList from './user-list.vue';
import AppUserDetail from './user-detail.vue';
import AppUserModule from './user-module.vue';

export default {
  name: 'Users',
  components: {
    AppUserDetail,
    AppUserList,
    AppUserModule,
  },
  mixins: [mixin],
  data() {
    return {
      vista: null,
    };
  },
  computed: {
    ...mapState('users', { users: 'collection', user: 'data', modules: 'modules',
      error: 'error', loading: 'loading' }),
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions('users', [
      'getUsersAction',
      'getUserAction',
      'deleteUserAction',
      'updatePasswordUserAction',
      'updateEstadoUserAction',
      'addUserAction',
      'updateUserAction',
      'getModulesAction',
      'addUserModulesAction',
    ]),
    async filtrar(payload = null) {
      try {
        this.loadBar(true);
        await this.getUsersAction(payload ? payload : undefined);
      } catch {
        this.parseError(this.error);
      } finally {
        this.loadBar(false);
      }
    },
    async init() {
      await this.filtrar();
      this.vista = 1;
    },
    async destroy(payload) {
      try {
        this.loadBar(true);
        await this.deleteUserAction(payload);
        await this.init();
        this.parseSuccess();
      } catch {
        this.parseError(this.error);
      } finally {
        this.loadBar(false);
      }
    },
    async changePassword(payload) {
      try {
        this.loadBar(true);
        await this.updatePasswordUserAction(payload);
        this.parseSuccess();
      } catch {
        this.parseError(this.error);
      } finally {
        this.loadBar(false);
      }
    },
    async changeState(payload) {
      try {
        this.loadBar(true);
        await this.updateEstadoUserAction(payload);
        await this.init();
        this.parseSuccess();
      } catch {
        this.parseError(this.error);
      } finally {
        this.loadBar(false);
      }
    },
    create() {
      this.vista = 2;
    },
    async edit(user) {
      try {
        this.loadBar(true);
        await this.getUserAction(user.id);
        this.vista = 3;
      } catch {
        this.parseError(this.error);
      } finally {
        this.loadBar(false);
      }
    },
    async editModules(user) {
      try {
        this.loadBar(true);
        await this.getModulesAction();
        await this.getUserAction(user.id);
        this.vista = 4;
      } catch {
        this.parseError(this.error);
      } finally {
        this.loadBar(false);
      }
    },
    async save(user) {
      try {
        this.loadBar(true);
        await this.addUserAction(user);
        await this.init();
        this.parseSuccess();
      } catch {
        this.parseError(this.error);
      } finally {
        this.loadBar(false);
      }
    },
    async update(user) {
      try {
        this.loadBar(true);
        await this.updateUserAction(user);
        await this.init();
        this.parseSuccess();
      } catch {
        this.parseError(this.error);
      } finally {
        this.loadBar(false);
      }
    },
    async saveModules(payload) {
      try {
        this.loadBar(true);
        await this.addUserModulesAction(payload);
        this.parseSuccess();
      } catch {
        this.parseError(this.error);
      } finally {
        this.loadBar(false);
      }
    },
  },
};
</script>
