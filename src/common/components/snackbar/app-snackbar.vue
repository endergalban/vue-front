<template>
  <v-snackbar
    v-model="snackbar.status"
    :bottom="snackbar.y === 'bottom'"
    :color="snackbar.color"
    :left="snackbar.x === 'left'"
    :multi-line="snackbar.mode === 'multi-line'"
    :right="snackbar.x === 'right'"
    :timeout="snackbar.timeout"
    :top="snackbar.y === 'top'"
    :vertical="snackbar.mode === 'vertical'"
  >
    {{ snackbar.text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        dark
        text
        v-bind="attrs"
        @click="snackbar.status = false"
      >
        {{ translate.close }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';
import constants from '@/common/constants';

export default {
  name: 'AppSnackBar',
  props: {
    lang: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    snackbar: {
      color: '',
      mode: 'multi-line',
      status: false,
      text: '',
      timeout: constants.snackbarTime,
      x: 'right',
      y: 'top',
    },
  }),
  computed: {
    ...mapState({ snackbarInfo: 'snackbar' }),
    translate() {
      return constants.langs[this.lang];
    },
  },
  watch: {
    snackbarInfo(newValue) {
      if (newValue) {
        this.snackbar.status = true;
        this.snackbar.text = newValue.text;
        this.snackbar.color = newValue.color;
      }
    },
  },
};
</script>
