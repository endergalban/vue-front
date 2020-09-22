<template>
  <v-progress-linear
    indeterminate
    color="yellow darken-2"
    :top="true"
    :fixed="true"
    :active="active"
  />
</template>

<script>
export default {
  name: 'AppLoader',
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
  .v-progress-linear--fixed {
    z-index: 10 !important;
  }
</style>
