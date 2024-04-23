import { Context } from '@nuxt/types';
import * as AxiosLogger from 'axios-logger';

AxiosLogger.setGlobalConfig({
  data: false
});

export default function ({ store, app: { $axios, router, $accessor }, isDev, $cookies }: Context) {
  $axios.onRequest((config) => {
    const token = $cookies.get(process.env.sessionTokenField as string) || store.state.auth.token;

    config.headers.Authorization = token ? `Bearer ${token}` : '';
    config.headers['custom-referer'] = router?.currentRoute?.fullPath;

    $accessor.httpEndpointsCallStackHandler(config.url as string);

    if (isDev) {
      AxiosLogger.requestLogger(config);
    }
  });

  $axios.onResponse((response) => {
    $accessor.httpEndpointsCallStackHandler(response.config.url as string);
    if (isDev) {
      AxiosLogger.responseLogger(response);
    }
  });
}
