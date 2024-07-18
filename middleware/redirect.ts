import { Middleware } from '@nuxt/types';

import { REDIRECT_LIST } from '~/constants/redirects';

const redirectMiddleware: Middleware = ({ route, redirect }) => {
  const { slug } = route.params;
  const redirectIndex = REDIRECT_LIST.findIndex((r) => r.param === slug);

  if (redirectIndex === -1) {
    return;
  }

  const { toPath, param } = REDIRECT_LIST[redirectIndex];

  redirect(`/${toPath}/${param}`);
};

export default redirectMiddleware;
