
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PageIndex.vue') },
      { path: 'Contracts', component: () => import('pages/Contracts.vue') },
      { path: 'History', component: () => import('pages/History.vue') },
      { path: 'Settings', component: () => import('pages/Settings.vue') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
