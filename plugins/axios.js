import * as AxiosLogger from 'axios-logger';

export default function ({ store, app: { $axios }, isDev, $cookies }) {
  $axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 60000
    // withCredentials: true
  });

  AxiosLogger.setGlobalConfig({
    data: false
  });

  $axios.onRequest((config) => {
    const token = $cookies.get('token') || store.state.auth.token;

    config.headers.Authorization = token ? `Bearer ${token}` : '';

    store.commit('httpEndpointsCallStackHandler', config.url);

    return isDev ? AxiosLogger.requestLogger(config) : config;
  });

  $axios.onResponse((response) => {
    store.commit('httpEndpointsCallStackHandler', response.config.url);
    return isDev ? AxiosLogger.responseLogger(response) : response;
  });

  $axios.onError(
    // async
    (error) => {
      const statusCode = error?.response?.status;

      if ([401, 403].includes(statusCode)) {
        // await store.dispatch('auth/fetchToken');
      }

      return isDev ? AxiosLogger.errorLogger(error) : error;
    }
  );
}
