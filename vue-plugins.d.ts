import { accessorType } from '~/store';
import { NuxtCookies } from 'cookie-universal-nuxt';
import { type httpMethods } from '~/plugins/http';
import type { httpSSRCache } from '~/plugins/cache-ssr';

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType;
    $http: httpMethods;
    $httpSSRCache: httpSSRCache;
    VueObserveVisibility: $ReplaceItType;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType;
    $http: httpMethods;
    $httpSSRCache: httpSSRCache;
    VueObserveVisibility: $ReplaceItType;
  }

  interface Context {
    $accessor: typeof accessorType;
    $http: httpMethods;
    $httpSSRCache: httpSSRCache;
    VueObserveVisibility: $ReplaceItType;
  }
}
