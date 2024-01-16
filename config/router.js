export default {
  prefetchLinks: false,
  middleware: 'reset-promocode',
  extendRoutes(routes, resolve) {
    routes.push({
      name: 'preorder-id',
      path: '/preorder/:id',
      component: resolve('pages/order/_id.vue')
    });
  }
};
