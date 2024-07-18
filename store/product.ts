import { defineStore } from 'pinia';
import productApi from '~~/api/productApi';
import { ProductResponse } from '~~/api/types/productTypes';

export const useProductStore = defineStore('product', () => {
  const product = ref<ProductResponse>();

  function getProduct(slug: string) {
    return productApi.getProduct(slug).then((res: ProductResponse) => {
      product.value = res;
      return res;
    });
  }

  return { getProduct, product };
});
