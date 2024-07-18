const STRIPE_PAYMENT_METHOD = {
  available: true,
  title: 'Stripe',
  icon: 'credit-card-bold',
  iconSelect: 'credit-card-small',
  name: 'stripe',
  label: 'Debit/Credit card',
  variantIcons: [
    {
      name: 'mastercard',
      desktop: { width: '25.71px', height: '16.11px' },
      mobile: { width: '18.46px', height: '12px' }
    },
    {
      name: 'visa',
      desktop: { width: '29.57px', height: '9.63px' },
      mobile: { width: '24.57px', height: '8px' }
    }
  ]
};

const PAYPAL_PAYMENT_METHOD = {
  available: true,
  title: 'PayPal',
  icon: 'paypal',
  iconSelect: 'paypal',
  name: 'paypal',
  label: 'PayPal account',
  variantIcons: []
};

const GOOGLE_PAY_PAYMENT_METHOD = {
  available: false,
  title: 'googlePay',
  icon: 'google',
  iconSelect: 'google',
  name: 'googlepay',
  label: 'Google Pay',
  variantIcons: []
};

const APPLE_PAY_PAYMENT_METHOD = {
  available: false,
  title: 'applePay',
  icon: 'apple',
  iconSelect: 'apple',
  name: 'applepay',
  label: 'Apple Pay',
  variantIcons: []
};

const LINK_PAY_PAYMENT_METHOD = {
  available: false,
  title: 'link',
  icon: 'link',
  iconSelect: 'link',
  name: 'link',
  label: 'Pay faster',
  variantIcons: []
};

export {
  STRIPE_PAYMENT_METHOD,
  PAYPAL_PAYMENT_METHOD,
  GOOGLE_PAY_PAYMENT_METHOD,
  APPLE_PAY_PAYMENT_METHOD,
  LINK_PAY_PAYMENT_METHOD
};
