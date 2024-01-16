export default async function ({ store, route }) {
  const unusedRoutes = ['basket', 'checkout', 'order-id'];

  if (unusedRoutes.includes(route.name)) {
    return;
  }

  if (store.getters['checkout/isPromoCode']) {
    await store.dispatch('checkout/deletePromoCode');
    await store.dispatch('checkout/fetchCart');
  }
}
