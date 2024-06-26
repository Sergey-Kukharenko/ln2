import { Middleware } from '@nuxt/types';

const authMiddleware: Middleware = ({ app: { $accessor }, redirect }) => {
  if (!$accessor.auth.isAuthorized) {
    redirect('/');
  }
};

export default authMiddleware;
