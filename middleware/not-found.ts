import { Middleware } from '@nuxt/types';

const notFoundMiddleware: Middleware = ({ $axios, error }) => {
  $axios.onError((err) => {
    if (!err.response || err.response.status === 404) {
      error({ statusCode: 404, message: 'Post not found' });
    }
  });
};

export default notFoundMiddleware;
