<template>
  <span>
    <vs-card>
      <vs-row>
        <vs-col vs-lg="6" vs-xs="12">
          <h5>Listado de usuarios [ Mostrando {{ users.data.length }} de {{ users.total }} </h5>
        </vs-col>
        <vs-col vs-lg="6" vs-xs="12">
          <div class="float-right">
            <vs-button @click="filtrar" icon="filter" size="small" color="success" :disabled="loading">
              Filtrar
            </vs-button>
            <vs-button @click="create" size="small" icon="add" color="primary" class="ml-2" :disabled="loading">
              Nuevo Usuario
            </vs-button>
          </div>
        </vs-col>
      </vs-row>
      <vs-divider/>
      <vs-row class="mb-3">
        <vs-col vs-lg="4" vs-xs="12">
          <vs-input placeholder="Nombre y Apellido" v-model.trim="filters.name" :disabled="loading" class="col-12"/>
        </vs-col>
        
        <vs-col vs-lg="3" vs-xs="12">
          <v-select  :options="types"  placeholder="Tipo" label="text" v-model="filters.type" :disabled="loading" :reduce="item => item.value" class="col-12"/>
        </vs-col>
        
        <vs-col vs-lg="3" vs-xs="12">
          <v-select  :options="estados"  placeholder="Estado" label="text" v-model="filters.enabled" :disabled="loading" :reduce="item => item.value" class="col-12"/>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col>
          <div class="table-responsive">
            <table class="table v-middle border">
              <thead>
                <tr class="bg-teal-400">
                  <th class="border-top-0">#</th>
                  <th class="border-top-0">Nombre y Apellido</th>
                  <th class="border-top-0">Email</th>
                  <th class="border-top-0">Tipo</th>
                  <th class="border-top-0">Estado</th>
                  <th class="border-top-0">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(user) in users.data"
                  :key="user.id"
                >
                  <td>{{ user.id }}</td>
                  <td>
                    <div>
                      {{ user.name }}
                    </div>
                  </td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.type }}</td>
                  <td>
                    <vs-button
                      size="small"
                      @click.prevent="abrirModalActualizarEstado(user)"
                      :disabled="loading"
                      :color="user.enabled  ? 'success' : 'danger'"
                    >
                      {{ user.enabled ? 'Activo' : 'Inactivo' }}
                    </vs-button>
                  </td>
                  <td nowrap>
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <vs-button
                      @click="edit(user)"
                      size="small"
                      icon="edit"
                      title="Editar"
                      color="primary"
                      :disabled="loading"
                      />
                      <vs-button
                      @click.prevent="editModules(user)"
                      size="small"
                      icon="list"
                      color="success"
                      class="ml-1"
                      title="Actualizar permisos"
                      :disabled="loading"
                      />
                      <vs-button
                      @click.prevent="abrirModalPassword(user)"
                      size="small"
                      icon="lock"
                      color="danger"
                      class="ml-1"
                      title="Actualizar password"
                      :disabled="loading"
                      />
                      <vs-button
                      @click="abrirModalEliminar(user)"
                      size="small"
                      icon="delete"
                      color="danger"
                      title="Eliminar"
                      class="ml-1"
                      :disabled="loading"
                      />
                      
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-pagination 
          @change="filtrar"
          prev-icon="arrow_back"
          next-icon="arrow_forward"
          :total="users.last_page" 
          :size-array="users.total" 
          :max-items="users.per_page"
          v-model="users.current_page"/>
      </vs-row>
      <vs-prompt
        accept-text="Aceptar"
        cancel-text="Cancelar"
         @accept="eliminar"
         :active.sync="mostrarModalEliminar"
         color="danger"
         title="Eliminar usuario"
       >
         <div class="con-exemple-prompt">
           Esta seguro que desea eliminar el usuario?
         </div>
      </vs-prompt>
      <vs-prompt
         accept-text="Aceptar"
         cancel-text="Cancelar"
         @accept="actualizarEstado"
         :active.sync="mostrarModalActualizarEstado"
          title="Actualizar estado"
       >
         <div class="con-exemple-prompt">
           Esta seguro que desea cambiar el estado del usuario?
         </div>
      </vs-prompt>
      <vs-prompt
        accept-text="Aceptar"
        cancel-text="Cancelar"
         @accept="actualizarPassword"
         :active.sync="mostrarModalPassword"
         :is-valid="!$v.passwordata.$invalid"
         size="large"
         color="danger"
         title="Cambiar password"
       >
         <div class="con-exemple-prompt">
           Ingresa la password y su confirmación
           <vs-row>
             <vs-input placeholder="Password" type="password" v-model="passwordata.password" class="mt-3"/>
             <vs-input placeholder="Confirmación" type="password" v-model="passwordata.confirmacion" class="mt-3"/>
           </vs-row>
         </div>
      </vs-prompt>
    </vs-card>
  </span>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'AppUserList',
  props: {
    users: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      mostrarModalEliminar: false,
      dataSeleccionada: null,
      mostrarModalPassword: false,
      mostrarModalActualizarEstado: false,
      passwordata: {
        id: null,
        password: null,
        confirmacion: null,
      },
      filters: {
        enabled: null,
        type: null,
        fechaInicial: null,
        fechaFinal: null,
        name: null,
        email: null,
      },
      estados: [
        { value: '1', text: 'Activo' },
        { value: '0', text: 'Inactivo' },
      ],
      types: [
        { value: 'admin', text: 'admin' },
        { value: 'user', text: 'user' },
      ],
      payload: {
        page: null,
        pageSize: process.env.VUE_APP_RECORDS_PER_PAGES,
        filters: '',
      },
    };
  },
  validations: {
    passwordata: {
      id: {
        required,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      confirmacion: {
        sameAsPassword: sameAs('password'),
      },
    },
  },
  methods: {
    filtrar(page) {
      if (this.payload.page) {
        this.payload.filters = '';
        this.payload.page = page;
        if (this.filters.enabled !== null) {
          this.payload.filters += `&enabled=${this.filters.enabled}`;
        }
        if (this.filters.type) {
          this.payload.filters += `&type=${this.filters.type}`;
        }
        if (this.filters.fechaInicial) {
          this.payload.filters += `&fecha_inicial=${this.filters.fechaInicial}`;
        }
        if (this.filters.fechaFinal) {
          this.payload.filters += `&fecha_final=${this.filters.fechaFinal}`;
        }
        if (this.filters.name) {
          this.payload.filters += `&name=${this.filters.name}`;
        }
        if (this.filters.email) {
          this.payload.filters += `&email=${this.filters.email}`;
        }
        this.$emit('filtrar', this.payload);
        return;
      }
      this.payload.page = page;
    },
    abrirModalEliminar(payload) {
      this.dataSeleccionada = payload;
      this.mostrarModalEliminar = true;
    },
    eliminar() {
      this.$emit('destroy', this.dataSeleccionada);
    },
    abrirModalPassword(payload) {
      this.mostrarModalPassword = true;
      this.passwordata.id = payload.id;
      this.passwordata.password = null;
      this.passwordata.confirmacion = null;
    },
    actualizarPassword() {
      this.$emit('changePassword', this.passwordata);
    },
    abrirModalActualizarEstado(payload) {
      this.dataSeleccionada = payload;
      this.mostrarModalActualizarEstado = true;
    },
    actualizarEstado() {
      const request = {
        id: this.dataSeleccionada.id,
        enabled: this.dataSeleccionada.enabled ? 0 : 1,
      };
      this.$emit('changeState', request);
    },
    create() {
      this.$emit('create');
    },
    edit(user) {
      this.$emit('edit', user);
    },
    editModules(user) {
      this.$emit('editModules', user);
    },
  },
};
</script>
