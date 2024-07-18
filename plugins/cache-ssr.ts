import { Plugin } from '@nuxt/types';

export type httpSSRCache = ({
  scope,
  field,
  url,
  payload
}: {
  scope: string;
  field: string;
  url: string;
  payload?: $ReplaceItType;
}) => Promise<$ReplaceItType>;

const TEN_MINUTES_IN_MS: number = 1000 * 60 * 10;
const getCacheSsrOffset = (): number => new Date().getTime() + TEN_MINUTES_IN_MS;

class CacheSSR {
  private data: $ReplaceItType;
  private datetime: number;

  constructor(data: object, datetime: number) {
    this.data = data;
    this.datetime = datetime;
  }

  getDataFromScope(scope: string, field: string) {
    if (new Date().getTime() <= this.datetime) {
      return this.data?.[scope]?.[field];
    }

    return null;
  }

  setDataToScope(scope: string, field: string, value: $ReplaceItType) {
    this.datetime = getCacheSsrOffset();

    this.data = {
      ...this.data,
      [scope]: {
        ...this.data?.[scope],
        [field]: value
      }
    };
  }

  clearData() {
    this.data = {};
    this.datetime = getCacheSsrOffset();
  }
}

type CacheSSRInstance = InstanceType<typeof CacheSSR>;

function createSSRCache() {
  let instance: CacheSSRInstance;

  return () => {
    if (!!instance && instance instanceof CacheSSR) {
      return instance;
    }

    instance = new CacheSSR({}, getCacheSsrOffset());
    return instance;
  };
}

const getSSRCache = createSSRCache();

const cacheSSRPlugin: Plugin = ({ app: { $http } }, inject) => {
  const httpSSRCache: httpSSRCache = async ({ scope, field, url, payload = {} }) => {
    const cacheSSR = getSSRCache();

    try {
      if (process.client) {
        return await $http.$get(url, payload);
      }

      const cacheRes = cacheSSR.getDataFromScope(scope, field);

      if (!cacheRes) {
        if (cacheRes === null) {
          cacheSSR.clearData();
        }

        const res = await $http.$get(url, payload);
        cacheSSR.setDataToScope(scope, field, res);
        return res;
      }

      return cacheRes;
    } catch (err) {
      console.error('Cache SSR Error:', err);
    }
  };

  inject('httpSSRCache', httpSSRCache);
};

export default cacheSSRPlugin;
