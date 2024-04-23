// STRIPE
const STRIPE = {
  publicKey: process.env.stripePublicKey,
  paymentConf: {
    lineItems: [
      {
        price: 'price_1MD0VAF7plSNwbQ3CdzsqMYI',
        quantity: 2
      }
    ],
    successURL: `${process.env.host}:${process.env.port}/order`,
    cancelURL: `${process.env.host}:${process.env.port}/`
  },
  redirectDelay: process.env.stripeTimeoutPayT
};

// PAYMENT STATUS MAP
const PAYMENT_STATUS_MAP = Object.freeze({
  basket: 'BASKET',
  order: 'ORDER',
  payment: 'PAYMENT',
  paid: 'PAID',
  confirmed: 'CONFIRMED',
  packed: 'PACKED',
  delivering: 'DELIVERING',
  delivered: 'DELIVERED',
  courierAssigned: 'COURIER_ASSIGNED',
  failPaid: 'FAIL_PAID',
  canceled: 'CANCELED'
});

const PAYMENT_ERROR_MESSAGE = 'Your payment has failed.\n Please, choose another payment method.';
const ORDER_ALREADY_PAID = {
  message: 'Order already paid',
  text: 'Sorry, this order has already been paid for.\n If you have any questions or need assistance, please contact our customer support'
};

const STRIPE_ERROR_CODE = 'card_declined';

export { STRIPE, PAYMENT_STATUS_MAP, PAYMENT_ERROR_MESSAGE, STRIPE_ERROR_CODE, ORDER_ALREADY_PAID };
