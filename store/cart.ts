import { defineStore } from 'pinia';
import { useMainStore } from './main';
import { cartApi, catalogApi } from '~~/api';
import { CatalogFilters, Offer } from '~~/api/types/catalogTypes';
// import { IProduct } from '~~/api/types/mainPage';

interface ExtendOffer extends Offer {
  category: string;
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref({});
  const postcards = ref<Offer[]>([]);
  const additionalProducts = ref<ExtendOffer[]>([
    {
      id: 12012,
      name: '',
      image: '',
      rate_count: 0,
      rate_value: 0,
      price_old: 0,
      discount: 0,
      price: 0,
      category: 'postcard',
      slug: '',
    },
  ]);

  enum SortAdd {
    postcard = 'postcard',
    'konfety-k-buketam' = 'konfety-k-buketam',
    'vozdushnye_shary' = 'vozdushnye_shary',
    toppery = 'toppery',
    toys = 'toys',
  }
  const addOrder = Object.keys(SortAdd);

  function addProductToBasket(payload: any) {
    cartApi.addProduct(payload).then(() => {
      getCart();
      // useNotificationStore().addNotification({ text: 'Товар добавлен в корзину', img: payload.image });
      useRouter().push('/cart');
    });
  }

  function getCart() {
    return cartApi.getBasket().then(({ data }) => {
      cart.value = {
        ...data,
        items: Object.keys(data.items).map((key: string) => {
          return data.items[key as keyof typeof data.items];
        }),
      };

      return Promise.resolve();
    });
  }

  function getPostcards() {
    cartApi.getPostcards().then((res: CatalogFilters) => {
      postcards.value = res.data.offers;
    });
  }
  function getAdditionalProducts() {
    additionalProducts.value = [
      {
        id: 12012,
        name: '',
        image: '',
        rate_count: 0,
        rate_value: 0,
        price_old: 0,
        discount: 0,
        price: 0,
        category: 'postcard',
        slug: '',
      },
    ];
    Promise.all([
      catalogApi.getFilters('?f[c][]=vozdushnye_shary&f[s][v]=popularity&page=1').then((res: CatalogFilters) => {
        additionalProducts.value = additionalProducts.value.concat(
          res.data.offers.slice(0, 5).map((item: Offer) => {
            return {
              ...item,
              category: 'vozdushnye_shary',
            };
          }),
        );
      }),
      catalogApi.getFilters('?f[c][]=konfety-k-buketam&&f[s][v]=popularity&page=1').then((res: CatalogFilters) => {
        additionalProducts.value = additionalProducts.value.concat(
          res.data.offers.slice(0, 5).map((item: Offer) => {
            return {
              ...item,
              category: 'konfety-k-buketam',
            };
          }),
        );
      }),
      catalogApi.getFilters('?f[c][]=toys&f[s][v]=popularity&page=1').then((res: CatalogFilters) => {
        additionalProducts.value = additionalProducts.value.concat(
          res.data.offers.slice(0, 5).map((item: Offer) => {
            return {
              ...item,
              category: 'toys',
            };
          }),
        );
      }),
      catalogApi.getFilters('?f[c][]=toppery&f[s][v]=popularity&page=1').then((res: CatalogFilters) => {
        additionalProducts.value = additionalProducts.value.concat(
          res.data.offers.slice(0, 5).map((item: Offer) => {
            return {
              ...item,
              category: 'toppery',
            };
          }),
        );
      }),
    ]).then(() => {
      additionalProducts.value = additionalProducts.value.sort(
        (a, b) => addOrder.indexOf(a.category) - addOrder.indexOf(b.category),
      );
    });
  }

  function addPostcard(id: number, text?: string) {
    return cartApi
      .addPostcard(id, text)
      .then(() => {
        getCart();
        // useNotificationStore().addNotification({ text: 'Открытка добавлена к заказу', img: image });
        return Promise.resolve();
      })
      .catch((e: unknown) => {
        return Promise.reject(e);
      });
  }

  function changeCount(id: number, count: number) {
    useMainStore().setDOMLoaded(false);
    cartApi
      .changeCount(id, count)
      .then(() => {
        getCart();
      })
      .finally(() => {
        useMainStore().setDOMLoaded(true);
      });
  }

  function deleteProduct(id: number) {
    useMainStore().setDOMLoaded(false);
    cartApi
      .deleteProduct(id)
      .then(() => {
        getCart();
      })
      .finally(() => {
        useMainStore().setDOMLoaded(true);
      });
  }

  async function resolveGreens(productId: string, bool: boolean) {
    useMainStore().setDOMLoaded(false);
    if (bool) {
      await cartApi.deleteGreens(productId);
      useMainStore().setDOMLoaded(true);
    } else {
      await cartApi.addGreens(productId);
      useMainStore().setDOMLoaded(true);
    }
    getCart();
  }

  return {
    addProductToBasket,
    getCart,
    changeCount,
    deleteProduct,
    getPostcards,
    addPostcard,
    getAdditionalProducts,
    resolveGreens,
    cart,
    postcards,
    additionalProducts,
  };
});
