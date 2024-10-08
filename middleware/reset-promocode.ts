import { Middleware } from '@nuxt/types';

const resetPromocodeMiddleware: Middleware = async ({ app: { $accessor }, route }) => {
  const unusedRoutes = ['cart', 'checkout-delivery-details', 'checkout-final-details', 'order-id'];

  if (route?.name && unusedRoutes.includes(route.name)) {
    return;
  }

  if ($accessor.checkout.checkoutPromocode) {
    await $accessor.checkout.deletePromoCode();
    await $accessor.checkout.fetchCheckout();
  }
};

export default resetPromocodeMiddleware;
