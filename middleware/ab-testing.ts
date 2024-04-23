import { Middleware } from '@nuxt/types';

import env from '~/config/env';
import { AB_TESTING_COOKIE } from '~/constants';

const abTestingMiddleware: Middleware = ({ app: { router, $cookies } }) => {
  const isABTesting = router?.currentRoute.query?.ab_testing && router.currentRoute.query.ab_testing === env.ABTesting;
  if (isABTesting) {
    $cookies.set(AB_TESTING_COOKIE, 1);
  }
  // раскомментируй когда нужно закончить ab тестирвание для всех пользователей
  // else {
  //   $cookies.remove(AB_TESTING_COOKIE);
  // }
};

export default abTestingMiddleware;
