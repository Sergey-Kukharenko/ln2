import * as AxiosLogger from 'axios-logger';

AxiosLogger.setGlobalConfig({
  data: false
});

export default function ({ store, app: { $axios, router }, isDev, $cookies }) {
  $axios.onRequest((config) => {
    const token = $cookies.get(process.env.sessionTokenField) || store.state.auth.token;

    config.headers.Authorization = token ? `Bearer ${token}` : '';
    config.headers['custom-referer'] = router.currentRoute.fullPath;

    store.commit('httpEndpointsCallStackHandler', config.url);

    if (isDev) {
      AxiosLogger.requestLogger(config);
    }
  });

  $axios.onResponse((response) => {
    store.commit('httpEndpointsCallStackHandler', response.config.url);
    if (isDev) {
      AxiosLogger.responseLogger(response);
    }
  });
}
