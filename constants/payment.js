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

// PAYPAL
const PAYPAL = {
  credentials: {
    sandbox: process.env.paypalClientId,
    production: ''
  },
  experienceOptions: {
    input_fields: {
      no_shipping: 1
    }
  },
  currency: 'GBP',
  amount: '10',
  myItems: [
    {
      name: 'hat',
      description: 'Brown hat.',
      quantity: '1',
      price: '5'
    },
    {
      name: 'handbag',
      description: 'Black handbag.',
      quantity: '1',
      price: '5'
    }
  ],
  styles: {
    label: 'checkout',
    size: 'responsive',
    shape: 'pill',
    color: 'silver',
    height: 40
  }
};

// PAYMENT STATUS MAP
const PAYMENT_STATUS_MAP = Object.freeze({
  payment: 'PAYMENT',
  paid: 'PAID',
  failPaid: 'FAIL_PAID'
});

export { STRIPE, PAYPAL, PAYMENT_STATUS_MAP };
