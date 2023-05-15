export default function ({ app }) {
  app.router.beforeResolve((to, from, next) => {
    if (app.store.getters['cookie/getCookie']) {
      app.store.dispatch('cookie/addCookie', false);
    }

    next();
  });
}
