import { Middleware } from '@nuxt/types';

const cookieMiddleware: Middleware = ({ app: { router, $accessor } }) => {
  router?.beforeResolve((_to: $ReplaceItType, _from: $ReplaceItType, next: () => void) => {
    if ($accessor.cookie.getCookie) {
      $accessor.cookie.addCookie(false);
    }

    next();
  });
};

export default cookieMiddleware;
