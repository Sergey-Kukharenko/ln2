import { defineStore } from 'pinia';
import { useMainStore } from './main';
import orderApi from '~~/api/orderApi';
import { OrderData } from '~~/api/types/orderTypes';

export const useOrderStore = defineStore('order', () => {
  const order = ref<OrderData>({
    showCallAuto: false,
    order: {
      id: 0,
      hash: '',
      status: '',
      action_status: '',
      is_active: false,
    },
    products: [],
    delivery_date: {
      start: [],
      end: [],
    },
    delivery_address: {
      is_secure: false,
      is_clarify: 0,
      address: '',
    },
    pay_form: '',
    recipient: {
      name: '',
      phone: '',
    },
    client: {
      name: '',
      phone: '',
    },
    comment: '',
    products_price: 0,
    delivery_price: 0,
    discount: '',
    promo: '',
    total_sum: 0,
    full_sum: 0,
    bonus_back: 0,
    payment_type_name: '',
    can_be_paid: false,
    pay_types: {},
    ecommerceScripts: '',
    title: {
      value: '',
      order_id: 0,
      status: '',
    },
  });

  function getOrder(id: number, hash: string | null, paymentType: string) {
    useMainStore().setLoading(true);
    return orderApi
      .getOrder(id, hash, paymentType)
      .then((res: any) => {
        return (order.value = {
          ...res,
          // @ts-ignore Shitty type form backend
          pay_types: Object.keys(res.pay_types).map((key) => {
            return {
              ...res.pay_types[key],
            };
          }),
        });
      })
      .catch((error) => {
        throw createError({ statusCode: 599, statusMessage: error.data.message, fatal: true });
      })
      .finally(() => {
        useMainStore().setLoading(false);
      });
  }

  function cancelOrder(id: number, hash: string) {
    orderApi.cancelOrder(id, hash).then(() => {
      useRouter().push('/');
    });
  }

  function getOrderStatus(orderId: number) {
    return orderApi.getOrderStatus(orderId);
  }

  return { order, getOrder, cancelOrder, getOrderStatus };
});
