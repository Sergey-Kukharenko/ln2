const TIME_OFFSET = 1000 * 60 * 10;
const getCacheSsrOffset = () => new Date().getTime() + TIME_OFFSET;

class CacheSSR {
  #timeWhenSet;

  constructor(data, datetime) {
    this.data = data;
    this.datetime = datetime;
  }

  getDataFromScope(scope, field) {
    if (this.timeWhenSet <= this.datetime) {
      return this.data?.[scope]?.[field];
    }

    return null;
  }

  setDataToScope(scope, field, value) {
    this.timeWhenSet = new Date().getTime();

    if (this.timeWhenSet < this.datetime) {
      this.data = {
        ...this.data,
        [scope]: {
          ...this.data?.[scope],
          [field]: value
        }
      };
    }
  }

  clearData() {
    this.data = {};
    this.datetime = getCacheSsrOffset();
  }
}

function createSSRCache() {
  let instance;

  return () => {
    if (!!instance && instance instanceof CacheSSR) {
      return instance;
    }

    instance = new CacheSSR({}, getCacheSsrOffset());
    return instance;
  };
}

const getSSRCache = createSSRCache();

export default function ({ app: { $http } }, inject) {
  async function httpSSRCache({ scope, field, url, payload = {} }) {
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
  }

  inject('httpSSRCache', httpSSRCache);
}
