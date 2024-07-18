import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { useOrderStore } from './order';
import checkoutApi from '~~/api/checkoutApi';
import { Checkout, Time, CheckoutConfirm, ICheckoutIntervals } from '~~/api/types/checkoutTypes';

export const useCheckoutStore = defineStore('checkout', () => {
  const orderStore = useOrderStore();

  const DEFAULT_CHECKOUT_DATA = {
    name: '',
    email: '',
    phone: '',
    byEmail: false,
    fast_buy: 0,
  };

  const info = ref<string>('me');
  const enabled = ref<boolean>(false);
  const checkoutData = ref(useLocalStorage('checkoutData', DEFAULT_CHECKOUT_DATA));
  const data = ref<Checkout>();
  const accurateTime = ref<Time>();
  const askAddress = ref(false);
  const isToday = ref<boolean>(false);

  const checkoutBody = reactive<CheckoutConfirm>({
    c_name: '',
    c_phone: '',
    c_email: '',
    r_name: '',
    r_phone: '',
    delivery_interval_id: 0,
    delivery_date: '',
    need_clarify_address: false,
    delivery_address: '',
    delivery_apartment: '',
    delivery_comment: '',
    delivery_in_time: '',
    delivery_price: 0,
    postcard: {
      active: false,
      text: '',
    },
    p_type_id: 0,
    p_interval_id: 0,
    promocode: '',
    bonus: 0,
    lat: '',
    lon: '',
  });
  const date = ref<string>('');
  const arivalAddres = ref<boolean>(false);
  const timeInfo = reactive<{ express: boolean; exact: boolean }>({
    express: false,
    exact: false,
  });
  const intervals = ref<ICheckoutIntervals>();

  function setDate(d: string) {
    date.value = d;
  }

  function setInfo(value: string) {
    info.value = value;
  }

  function setEnabled(bool: boolean) {
    enabled.value = bool;
  }

  function setAskAddress(bool: boolean) {
    askAddress.value = bool;
  }

  function setCheckoutData(name: string, phone: string, email: string, byEmail: boolean) {
    checkoutData.value = {
      ...checkoutData.value,
      name,
      phone: phone.replace('(', '').replace(')', '').replace(/ /g, '').replace(/-/g, '').replace('+', ''),
      email,
      byEmail,
    };
  }

  function setFastBuy(value: number) {
    checkoutData.value.fast_buy = value;
  }

  async function createCheckout() {
    const isEmpty = !Object.keys(checkoutData.value ?? {}).length;

    if (isEmpty) {
      throw new Error('Empty -> checkoutData');
    }

    const { name = '', phone = '', email = '', byEmail, fast_buy: fastBuy } = checkoutData.value;
    const response = await checkoutApi.createCheckout(name, phone, email, byEmail, fastBuy);
    data.value = response;

    if (response.basket.items.length === 0) {
      return navigateTo('/cart');
    }

    return response;
  }

  // TODO remove any from val!!!!!!!!!!!
  function setConfirmField<T extends keyof CheckoutConfirm>(field: T, val: any) {
    checkoutBody[field] = val;
    if (field === 'delivery_date' && checkoutBody.lat && checkoutBody.lon) {
      getDeliveryPrice(checkoutBody.lat, checkoutBody.lon);
    }
  }

  function confirmCheckout() {
    checkoutApi.confirmCheckout(checkoutBody);
  }

  function getAccurateTime(dateR: string) {
    // const today = new Date();
    checkoutApi.getAccurateTime(`${dateR}`).then((res: Time) => {
      accurateTime.value = res;
    });
  }

  async function getIntervals(dateR: string) {
    try {
      const response = await checkoutApi.getIntervals(dateR);
      intervals.value = response;
    } catch (error) {
      console.error(error);
    }
  }

  function getAddressHint(address: string) {
    if (address) {
      return checkoutApi.getAddressHint(address);
    }
    return [];
  }

  const promocode = ref<string>('');
  const promocodeDiscount = ref<number>(0);
  function checkPromocode(code: string) {
    return new Promise((resolve, reject) => {
      checkoutApi
        .checkPromocode(code)
        .then((res: any) => {
          if (res.status === 'success') {
            // notificationStore.addNotification({ text: `Промокод ${code} добавлен` });
            promocode.value = code;
            promocodeDiscount.value = res.discount_percent;
            return resolve('Промокод успешно применен!');
          } else {
            // notificationStore.addNotification({ text: res.message, error: true });
            promocode.value = '';
            promocodeDiscount.value = 0;
            return reject(new Error(res.message));
          }
        })
        .catch(() => {
          // notificationStore.addNotification({ text: 'Неверный промокод', error: true });
          promocode.value = '';
          promocodeDiscount.value = 0;
          return reject(new Error('Неверный промокод'));
        });
    });
  }

  function sendUserData(userContact: string) {
    return checkoutApi
      .sendUserData(userContact)
      .then(() => {
        return Promise.resolve();
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }

  function sendCode(userContact: string, code: string) {
    return checkoutApi
      .sendCode(userContact, code)
      .then(() => {
        return Promise.resolve();
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }

  function setTimeInfo(exact: boolean, express: boolean) {
    timeInfo.exact = exact;
    timeInfo.express = express;
  }

  function makeOrder() {
    const body: any = {
      'client[name]': checkoutData.value.name,
      'client[phone]': '+' + checkoutData.value.phone,
      'client[email]': checkoutData.value.email,
      'recipient[name]': info.value !== 'me' ? checkoutBody.r_name : checkoutData.value.name,
      'recipient[phone]': info.value !== 'me' ? checkoutBody.r_phone : '+' + checkoutData.value.phone,
      'payment[type_id]': checkoutBody.p_type_id ? checkoutBody.p_type_id : data.value?.payments[0].payment_type_id,
      delivery_address: checkoutBody.delivery_address,
      delivery_apartment: checkoutBody.delivery_apartment,
      delivery_comment: checkoutBody.delivery_comment,
      need_clarify_address: askAddress.value,
      delivery_date: checkoutBody.delivery_date,
    };
    if (timeInfo.exact) {
      body.delivery_in_time = checkoutBody.delivery_in_time;
    } else if (timeInfo.express) {
      body.delivery_express = true;
    } else {
      body.delivery_interval_id = checkoutBody.delivery_interval_id || data.value?.intervals[0].id;
    }

    if (promocode.value) {
      body.promocode = promocode.value;
    }
    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });
    checkoutApi.makeOrder(formData).then((res: any) => {
      // const router = useRouter();
      // router.push(
      //   `/order/${res.id}?hash=${res.hash}&payment=${
      //     checkoutBody.p_type_id ? checkoutBody.p_type_id : data.value?.payments[0].payment_type_id
      //   }`,
      // );

      // Payment link comes only from get order API by html form
      orderStore.getOrder(res.id, res.hash, body['payment[type_id]']).then((order) => {
        if (body['payment[type_id]'] === 1 || body['payment[type_id]'] === '1') {
          useRouter().push(`/order/${order.order.id}?hash=${order.order.hash}`);
        } else {
          const div = document.createElement('div');
          div.innerHTML = order.pay_form;
          document.body.appendChild(div);

          const form = div.querySelector('form');
          if (form) {
            form.submit();
          }
        }
      });
    });
  }

  function setIsToday(bool: boolean) {
    isToday.value = bool;
  }

  const payments = ref([]);
  function getPayments() {
    checkoutApi.getPayments().then((res: any) => {
      payments.value = res;
    });
  }

  const deliveryData = ref();
  function getDeliveryPrice(lat: string, lon: string) {
    checkoutApi
      .getDeliveryPrice(lat, lon, checkoutBody.delivery_date)
      .then((res) => {
        deliveryData.value = res.data;
        setConfirmField('delivery_price', res.data.overall_delivery_price);
      })
      .catch(() => {
        setConfirmField('delivery_price', 0);
      });
  }

  return {
    info,
    setInfo,
    enabled,
    setEnabled,
    setCheckoutData,
    createCheckout,
    data,
    date,
    getAccurateTime,
    accurateTime,
    getAddressHint,
    checkPromocode,
    confirmCheckout,
    setConfirmField,
    setDate,
    arivalAddres,
    sendUserData,
    sendCode,
    timeInfo,
    setTimeInfo,
    setFastBuy,
    checkoutBody,
    setAskAddress,
    askAddress,
    makeOrder,
    promocodeDiscount,
    getPayments,
    payments,
    isToday,
    setIsToday,
    getDeliveryPrice,
    getIntervals,
    intervals,
    deliveryData,
  };
});
