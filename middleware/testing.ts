import { Middleware } from '@nuxt/types';

import env from '~/config/env';
import { AB_TESTING_COOKIE, AC_TESTING_COOKIE } from '~/constants';

const abTestingMiddleware: Middleware = ({ app: { router, $cookies } }) => {
  const isABTesting = router?.currentRoute.query?.ab_testing && router.currentRoute.query.ab_testing === env.ABTesting;
  const isACTesting = router?.currentRoute.query?.ac_testing && router.currentRoute.query.ac_testing === env.ACTesting;

  if (isABTesting) {
    $cookies.set(AB_TESTING_COOKIE, 1);
  }
  if (isACTesting) {
    $cookies.set(AC_TESTING_COOKIE, 1);
  }
  // раскомментируй когда нужно закончить abc тестирвание для всех пользователей
  // $cookies.remove(AB_TESTING_COOKIE);
  // $cookies.remove(AC_TESTING_COOKIE);
};

export default abTestingMiddleware;
