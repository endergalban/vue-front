const usersRoutes = [
  {
    path: '',
    component: () => import('@/common/components/MainContainer.vue'),
    children: [
      {
        path: '/users',
        name: 'users',
        component: () => import(/* webpackChunkName: "users" */ '../components/users.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];

export default usersRoutes;
