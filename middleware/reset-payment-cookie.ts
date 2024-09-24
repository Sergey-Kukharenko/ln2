import { Middleware } from '@nuxt/types';

const resetPaymentCookie: Middleware = ({ app: { $cookies }, route }) => {
  const unusedRoutes = ['preorder-id', 'checkout', 'order-id', 'payment-stripe'];
  const PAYMENT_METHOD_COOKIE = 'payment-method';

  if (route?.name && unusedRoutes.includes(route.name)) {
    return;
  }

  if ($cookies.get(PAYMENT_METHOD_COOKIE)) {
    $cookies.remove(PAYMENT_METHOD_COOKIE);
  }
};

export default resetPaymentCookie;
