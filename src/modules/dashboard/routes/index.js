const dashboardRoutes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import(
      /* webpackChunkName: "app-dashboard" */ '../components/app-dashboard.vue'
    ),
    meta: { requiresAuth: true },
  },
];

export default dashboardRoutes;
