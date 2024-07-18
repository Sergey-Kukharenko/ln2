export default {
  prefetchLinks: false,
  // middleware: 'reset-promocode',
  middleware: 'trailing-slash',
  extendRoutes(routes, resolve) {
    for (const key in routes) {
      routes[key].caseSensitive = true;
    }

    routes.push({
      name: 'preorder-id',
      path: '/preorder/:id',
      component: resolve('pages/order/_id.vue')
    });
  }
};
