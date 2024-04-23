import { Plugin } from '@nuxt/types';

import type { NuxtAxiosInstance } from '@nuxtjs/axios';

import { TOKEN_REFRESH_ENDPOINT } from '~/constants';

type AxiosMethods = keyof Pick<
  NuxtAxiosInstance,
  '$delete' | '$get' | '$patch' | '$head' | '$options' | '$post' | '$put' | '$request'
>;

export interface httpMethods {
  $get: <T>(...args: Parameters<NuxtAxiosInstance['$get']>) => Promise<T>;
  $delete: <T>(...args: Parameters<NuxtAxiosInstance['$delete']>) => Promise<T>;
  $head: <T>(...args: Parameters<NuxtAxiosInstance['$head']>) => Promise<T>;
  $options: <T>(...args: Parameters<NuxtAxiosInstance['$options']>) => Promise<T>;
  $post: <T>(...args: Parameters<NuxtAxiosInstance['$post']>) => Promise<T>;
  $put: <T>(...args: Parameters<NuxtAxiosInstance['$put']>) => Promise<T>;
  $patch: <T>(...args: Parameters<NuxtAxiosInstance['$patch']>) => Promise<T>;
  $request: <T>(...args: Parameters<NuxtAxiosInstance['$request']>) => Promise<T>;
}

const httpPlugin: Plugin = ({ store, app: { $axios }, $cookies }, inject) => {
  let isRetryUpdateTokenProcess = false;

  function httpHandler<T>(method: AxiosMethods, ...args: Parameters<NuxtAxiosInstance[AxiosMethods]>): Promise<T> {
    const token = $cookies.get(process.env.sessionTokenField as string);
    const [url] = args;

    if (process.client && !token && url !== TOKEN_REFRESH_ENDPOINT) {
      if (!isRetryUpdateTokenProcess) {
        return new Promise((resolve) => {
          isRetryUpdateTokenProcess = true;
          store
            .dispatch('auth/fetchToken')
            .then(() => {
              resolve(($axios[method] as $ReplaceItType)(...args));
            })
            .catch((err) => {
              console.error(err); // нужно обработать этот кейс, можно например показать попап с просьбой перезагрузить страницу ну или самим перезагрузить ее. В общем надо подумать.
            })
            .finally(() => {
              isRetryUpdateTokenProcess = false;
            });
        });
      } else {
        return new Promise((resolve) => {
          let timeout: ReturnType<typeof setTimeout>;
          const checkUpdateFinish = () => {
            if (timeout) {
              clearTimeout(timeout);
            }

            if (!isRetryUpdateTokenProcess) {
              resolve(($axios[method] as $ReplaceItType)(...args));
            } else {
              timeout = setTimeout(checkUpdateFinish);
            }
          };

          checkUpdateFinish();
        });
      }
    } else {
      return ($axios[method] as $ReplaceItType)(...args);
    }
  }

  const httpMethods: httpMethods = {
    $get: (...args: Parameters<NuxtAxiosInstance['$get']>) => httpHandler('$get', ...args),
    $delete: (...args: Parameters<NuxtAxiosInstance['$delete']>) => httpHandler('$delete', ...args),
    $head: (...args: Parameters<NuxtAxiosInstance['$head']>) => httpHandler('$head', ...args),
    $options: (...args: Parameters<NuxtAxiosInstance['$options']>) => httpHandler('$options', ...args),
    $post: (...args: Parameters<NuxtAxiosInstance['$post']>) => httpHandler('$post', ...args),
    $put: (...args: Parameters<NuxtAxiosInstance['$put']>) => httpHandler('$put', ...args),
    $patch: (...args: Parameters<NuxtAxiosInstance['$patch']>) => httpHandler('$patch', ...args),
    $request: (...args: Parameters<NuxtAxiosInstance['$request']>) => httpHandler('$request', ...args)
  };

  inject('http', httpMethods);
};

export default httpPlugin;
