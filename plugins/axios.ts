import { Context } from '@nuxt/types';
import * as AxiosLogger from 'axios-logger';

AxiosLogger.setGlobalConfig({
  data: false
});

export default function ({ store, app: { $axios, router, $accessor }, isDev, $cookies }: Context) {
  $axios.onRequest((config) => {
    const sessionToken = $cookies.get(process.env.sessionTokenField as string) || store.state.auth.sessionToken;
    const authToken = $cookies.get(process.env.authTokenField as string) || store.state.auth.authToken;

    config.headers['custom-referer'] = router?.currentRoute?.fullPath;

    if (sessionToken) {
      config.headers['X-Flor-Session'] = sessionToken;
    }

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

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
