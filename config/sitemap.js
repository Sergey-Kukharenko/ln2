import { format } from 'date-fns';

import { IMG_SIZES_MAP } from '../constants/image-sizes';
import { useSizedImage } from '../helpers';

import env from './env';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

const getHttpEndpoint = async (path) => {
  try {
    const { data } = await axios.get(`${env.baseUrl}/${path}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getProducts = (link, token, limit = 999) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    const { data } = await axios.get(link, {
      params: {
        limit
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (data.pagination.total > limit) {
      const list = await getProducts(link, token, data.pagination.total);
      resolve(list);
    } else {
      resolve(data.list);
    }
  });

const exclude = [
  '/cart',
  '/not-found',
  '/checkout/**',
  '/signin/**',
  '/signup/**',
  '/signin',
  '/signup',
  '/search',
  '/payment/**',
  '/_icons'
];

export default {
  hostname: process.env.DOMAIN_NAME,
  gzip: true,
  cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  exclude,

  async routes() {
    const { token } = await getHttpEndpoint('v1/session');
    const categories = await getHttpEndpoint('v1/categories');

    const topRouteLinks = Object.keys(categories).reduce((acc, key) => {
      const groupByPrefixAndSlug = (item) => {
        const isValidItem = typeof item === 'object' && item !== null && 'prefix' in item && 'slug' in item;

        if (!isValidItem) {
          return;
        }

        acc.push({ url: `/${item.prefix}/${item.slug}` });
      };

      const groupByList = (list) => {
        if (!Array.isArray(list)) {
          return;
        }

        list.forEach(groupByPrefixAndSlug);
      };

      const isObjWithSubList = !!categories[key].list;
      const isArrayList = Array.isArray(categories[key]);

      if (isObjWithSubList) {
        groupByList(categories[key].list);
      } else if (isArrayList) {
        categories[key].forEach((item) => {
          if (item.list) {
            groupByList(item.list);
          } else {
            groupByPrefixAndSlug(item);
          }
        });
      } else {
        groupByPrefixAndSlug(categories[key]);
      }

      return acc;
    }, []);

    const actions = topRouteLinks
      .map(({ url }) => {
        const replacedLink = url.replace(env.domainName, '');

        return `${env.baseUrl}/v1${replacedLink}`;
      })
      .map((link) => getProducts(link, token));

    const products = await Promise.all(actions);
    const productLinks = products.flat().map((p) => ({ ...p, url: `/product/${p.slug}` }));

    return Array.from(new Set([].concat(productLinks, topRouteLinks))).map((p) => {
      const item = {
        url: p.url,
        lastmod: format(new Date(), 'yyyy-MM-dd'),
        changefreq: 'weekly',
        priority: 0.6
      };

      if (p.img && p.real_id) {
        item.img = [
          {
            url: useSizedImage({ realId: p.real_id, sizeName: IMG_SIZES_MAP.max, imgName: p.img, env }),
            title: p.title
          }
        ];
      }

      return item;
    });
  },

  filter({ routes }) {
    return routes.map((route) => {
      const fields = {
        url: route.url,
        lastmod: format(new Date(), 'yyyy-MM-dd'),
        changefreq: 'weekly',
        priority: route.url === '/' ? 1 : 0.6
      };

      return route.priority ? route : fields;
    });
  }
};
