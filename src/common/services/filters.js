import Vue from 'vue';
import moment from 'moment';

Vue.filter('dateShort', (value) => {
  if (!value) return '';
  return moment(String(value.toString())).format('DD-MM-YYYY');
});

Vue.filter('hours', (value) => {
  if (!value) return '';
  return moment(String(value.toString())).format('HH:mm:ss');
});

Vue.filter('dateLong', (value) => {
  if (!value) return '';
  return moment(String(value.toString())).format('DD-MM-YYYY HH:mm:ss');
});

Vue.filter('decimal', (numero) => {
  if (!numero) return '0.00';
  return parseFloat(numero).toFixed(2);
});
