<template>
  <span v-if="user">
    <vs-card>
      <vs-row>
        <span v-if="user.id"><h5>Editando usuario [ {{ user.name }} ]</h5></span>
        <span v-else><h5>Nuevo usuario</h5></span>
      </vs-row>
      <vs-divider/>
      <vs-row>
        <vs-col vs-lg="4"  vs-xs="12" class="mt-3">
          <vs-input label="Nombre" v-model="$v.user.name.$model" class="col-12"
          :danger="$v.user.name.$error"/>
        </vs-col>
        <vs-col vs-lg="4"  vs-xs="12" class="mt-3">
          <vs-input label="Email" v-model="$v.user.email.$model" class="col-12"
          :danger="$v.user.email.$error"
          />
        </vs-col>
        <vs-col vs-lg="4"  vs-xs="12" class="mt-3" v-if="!user.id">
          <vs-input label="Password" type="password" v-model="$v.user.password.$model" class="col-12"
          :danger="$v.user.password.$error" />
        </vs-col>
        
        <vs-col vs-lg="4"  vs-xs="12" class="mt-3">
          <label>Tipo de Usuario</label>
          <v-select  :options="types"  placeholder="seleccione..." label="text" v-model="$v.user.type.$model" :disabled="loading" :reduce="item => item.value" :class="{'select-danger': $v.user.type.$error}"/>
        </vs-col>
        
        <vs-col vs-lg="4"  vs-xs="12" class="mt-3 mb-3" v-if="user.id">
          <label>Estado</label>
          <v-select  :options="estados"  placeholder="seleccione..." label="text" v-model="$v.user.enabled.$model" :disabled="loading" :reduce="item => item.value" :class="{'select-danger': $v.user.enabled.$error}"/>
        </vs-col>
        
        <vs-input v-model="user.id" readonly hidden/>
        
      </vs-row>
      <vs-divider />
      <vs-row >
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
  </span>
</template>

<script>
import {
  required,
  email,
  minLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'AppUserDetail',
  props: {
    user: {
      type: Object,
      default: function () {
        return { 
          id: null,
          name: null,
          type: null,
          password: null,
          email: null,
          enabled: 1, 
        }
      }
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      estados: [
        { value: null, text: 'seleccione...' }, 
        { value: 1, text: 'Activo' },
        { value: 0, text: 'Inactivo' },
      ],
      types: [
        { value: null, text: 'seleccione...' },
        { value: 'admin', text: 'admin' },
        { value: 'user', text: 'user' },
      ],
    };
  },
  validations() {
    const password = !this.user.id 
      ? { minLength: minLength(6), required }
      : { minLength: minLength(6) }
      
    return {
      user: {
        name: {
          required,
        },
        email: {
          required,
          email,
        },
        type: {
          required,
        },
        password,
        enabled: {
          required,
        },
      },
    };
  },
  methods: {
    guardar() {
      this.$v.$touch();
      if (!this.$v.user.$invalid) {
        if (this.user.id) {
          this.$emit('update', this.user);
        } else {
          this.$emit('save', this.user);
        }
      }
    },
    volver() {
      this.$emit('volver');
    },
  },
};
</script>