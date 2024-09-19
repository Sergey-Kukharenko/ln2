import { Middleware } from '@nuxt/types';

const profileRedirectMiddleware: Middleware = ({ redirect }) => {
  redirect('/profile/dashboard/');
};

export default profileRedirectMiddleware;
