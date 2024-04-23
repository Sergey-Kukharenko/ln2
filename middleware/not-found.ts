import { Middleware } from '@nuxt/types';

const notFoundMiddleware: Middleware = ({ $axios, redirect }) => {
  $axios.onError((error) => {
    if (!error.response || error.response.status === 404) {
      redirect('/not-found');
    }
  });
};

export default notFoundMiddleware;
