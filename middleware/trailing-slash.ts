import { Middleware } from '@nuxt/types';

const trailingSlashMiddleware: Middleware = ({ route, redirect }) => {
  if (route.path === '/' || !route.path.endsWith('/')) return;

  const path: string = route.path.replace(/\/+$/, '') || '/';

  return redirect(301, path, route.query);
};

export default trailingSlashMiddleware;
