<template>
  <span>
    <vs-row vs-justify="center">
      <vs-col vs-lg="12">
        <vs-card>
          <vs-row>
            <h5>Permisos de usuario [ {{ user.name }} ]</h5>
          </vs-row>
          <vs-divider/>
          <vs-row>
            <table class="table v-middle border">
              <thead>
                <tr class="bg-teal-400">
                  <th class="border-top-0">#</th>
                  <th class="border-top-0">Modulo</th>
                  <th class="border-top-0">Seleccionar</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(mudule) in modules.data"
                  :key="mudule.id"
                >
                  <td>{{ mudule.order }}</td>
                  <td>{{ mudule.name }}</td>
                  <td nowrap>
                    <input type="checkbox" id="mike" :value="mudule.id" v-model="menus">
                  </td>
                </tr>
              </tbody>
            </table>
          </vs-row>
          <vs-divider/>
          <vs-row>
            <vs-button
              size="small"
              @click="volver()"
              title="Volver"
              icon="arrow_back_ios"
              color="grey"
              :disabled="loading"
            >
              Volver
            </vs-button>
            <vs-button
              size="small"
              @click="guardar()"
              title="Guardar"
              icon="save"
              color="primary"
              class="ml-1"
              :disabled="loading"
            >
              Guardar
            </vs-button>
          </vs-row>
        </vs-card>
      </vs-col>
    </vs-row>
  </span>
</template>

<script>
export default {
  name: 'AppUserModule',
  props: {
    user: {
      type: Object,
      required: true
    },
    modules: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      menus: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    async guardar() {
      this.$emit('saveModules', {
        menus: this.menus,
        user_id: this.user.id,
      })
    },
    async init() {
      this.user.modules.forEach((module) => {
        this.menus.push(module.id);
      });
    },
    volver() {
      this.$emit('volver');
    },
  },
};
</script>
