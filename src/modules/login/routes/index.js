const loginRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(
      /* webpackChunkName: "app-login" */ '../components/app-login.vue'
    ),
  },
];

export default loginRoutes;
