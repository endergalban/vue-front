import Vue from 'vue';
import VueRouter from 'vue-router';
import dashboardRoutes from '../modules/dashboard/routes';
import loginRoutes from '../modules/login/routes';

Vue.use(VueRouter);

const routes = [
  ...dashboardRoutes,
  ...loginRoutes,
];

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
