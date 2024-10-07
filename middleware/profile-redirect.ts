import { Middleware } from '@nuxt/types';

const profileRedirectMiddleware: Middleware = ({ redirect, app }) => {
  const path = app.$device.isDesktopOrTablet ? '/profile/dashboard/' : '/profile/orders/';
  redirect(path);
};

export default profileRedirectMiddleware;
