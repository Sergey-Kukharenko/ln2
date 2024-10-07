const MAIN_PAGE_LIMIT = 7;

const LIST_ITEM_VIEW_COUNT = 5;

const FILTER_TYPES = {
  checkbox: 'checkbox',
  range: 'range',
  radio: 'radio'
};

const AUTH_REG_STEPS = {
  auth: { name: 'auth', component: 'AppAuth', page: 'signin' },
  code: { name: 'code', component: 'AppCode', page: 'signin-code' },
  codeNotReceived: { name: 'codeNotReceived', component: 'AppNotReceived', page: 'signin-code-notReceived' },
  reg: { name: 'reg', component: 'AppReg', page: 'signup' },
  regCompleted: { name: 'regCompleted', component: 'AppCompleted', page: 'signup-completed' }
};

const AUTH_REG_ERROR_MESSAGES = {
  email: {
    invalid: 'Invalid mail format',
    notExists: 'There is no such mail'
  },
  phone: {
    invalid: 'Invalid number format',
    notExists: 'There is no such number'
  },
  code: 'Invalid code',
  invalidFormat: 'Invalid fomat',
  requiredField: 'Field is required'
};

const AUTH_REG_TYPES = ['phone', 'email'];

const AUTH_CODE_TIMER = {
  step: 1000,
  duration: 40000
};

const CODE_INPUT_DEFAULT_COUNT = 4;

const CHECKOUT_FORM_KEYS = {
  name: 'name',
  phone: 'phone',
  address: 'address',
  dateTime: 'dateTime',
  email: 'email'
};

const INFO_BUTTONS = [
  {
    text: 'contacts',
    images: ['/images/info/avatar-female.web', '/images/info/avatar-male.web']
  },
  {
    text: 'delivery',
    images: ['/images/info/gift.webp']
  },
  {
    text: 'reviews',
    images: ['/images/info/like.webp']
  }
];

const REVIEW_CARD_SYMBOLS_COUNT = 70;

const CHECKOUT_INPUT_DELAY = 600;

const PAGINATION = {
  limit: 12,
  btnCount: 5,
  blindValue: 3
};

const CATEGORY_PRODUCT_TYPES = ['Category', 'Filter'];

const NO_SCROLL_CLASS_NAME = 'noscroll';

const ORDER_STATUS_TEXT = {
  paid: {
    getTitle(orderId) {
      return `The order #${orderId} is paid`;
    },
    text: 'Expect delivery'
  },
  inProcess: {
    title: 'Processing the payment',
    text: 'Please wait'
  },
  notPaid: {
    getTitle(orderId) {
      return `The order #${orderId} is awaiting payment`;
    },
    text: 'Please pay for the order'
  },
  failed: {
    title: 'Transaction failed',
    text: 'Please try again, or use a different payment method'
  },
  canceled: {
    getTitle(orderId) {
      return `The order #${orderId} is canceled`;
    },
    text: 'Please, try again'
  }
};

const MAIN_PAGE_CONTENT_PARAMS = {
  bestSellers: {
    slug: 'best-sellers',
    limit: 4
  },
  specialOffers: {
    slug: 'special-offers'
  },
  under25ps: {
    slug: 'under-ps25'
  },
  baseRoses: {
    slug: 'filter/roses'
  },
  trendy: {
    slug: 'trendy-buckets'
  }
};

const ALL_CATEGORIES_BUTTON = {
  path: '/category/all-flowers/',
  text: 'Go to the catalog'
};

const PRODUCT_CARD_IMAGE_SIZE = {
  mobile: 222,
  desktop: 320
};

const CHECK_ADDRESS_ERROR_DELAY = 1500;

const ADDRESS_MANUALLY_TEXT = 'Еnter address manually';
const ADDRESS_SEARCH_TEXT = 'Search for an address';

const SEARCH_INPUT_PLACEHOLDER = {
  manual: 'Address line 1',
  search: 'Search your postcode or address'
};

const RELOAD_ORDER_DELAY = {
  1: 1000,
  2: 1000,
  3: 2000,
  4: 4000,
  5: 8000
};

const OUR_COOKIE = 'our-cookie';
const AUTH_WITHOUT_SMS_COOKIE = 'auth-without-sms';
const AUTH_SMS_COOKIE = 'auth-sms';
const PAYMENT_METHOD_COOKIE = 'payment-method';
const BANNER_COOKIE = 'banner';

const MONTH_LIST = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CHECKOUT_INTERVAL_TAB_NAMES = {
  0: 'today',
  1: 'tomorrow',
  2: 'anotherDay'
};

const SUBSCRIBE_MESSAGES = {
  success: {
    subscribe: 'Successfully subscribed',
    unsubscribe: 'Successfully unsubscribed'
  },
  error: {
    exists: 'Mail already exists',
    empty: 'Enter your email'
  }
};

const SUBSCRIBE_ACTION_TYPES = {
  subscribe: 'subscribe',
  unsubscribe: 'unsubscribe'
};

const SUBSCRIBE_VARIANTS = {
  email: 'email_subscription',
  sms: 'sms_subscription',
  push: 'push_subscription'
};

const MONTH_DAY_COUNT = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31
};

const FIXED_TIMEZONE = 'Europe/London';

const TODAY_DATE_COOKIE = 'today-date';

const APPLE_PAY = 'applepay';
const GOOGLE_PAY = 'googlepay';
const LINK_PAY = 'link';

const CONSTRUCTOR_TOOLTIP = {
  icon: 'dark-circle-question-mark',
  content: [
    {
      title: 'Short length',
      description: 'rose with a small bud. Such bouquet will be smaller in size'
    },
    {
      title: 'Premium Rose',
      description:
        '- the best varieties of Holland Roses. With a large bud, such bouquet will be twice as much as a bouquet of Kenyan Rose'
    }
  ]
};

const TOKEN_REFRESH_ENDPOINT = '/v1/session/';

const CONSTRUCTOR_HEIGHT_COOKIE = 'constructor-type';
const CONSTRUCTOR_PACKAGE_COOKIE = 'constructor-package';

const BONUS = 'bonus-receive';
const EMAIL_DELAY = 2000;

const CART_TOOLTIP = {
  icon: 'dark-circle-question-mark',
  content: [
    {
      title: '',
      description: 'You can enter \npromo code\n in the checkout'
    }
  ]
};

const CHECKOUT_STEPS = {
  delivery: { id: 1, title: 'Delivery details', page: 'checkout-delivery-details' },
  final: { id: 2, title: 'Final details', page: 'checkout-final-details' }
};

const CHECKOUT_STEP_COOKIE = 'checkout-step';

const CONSTRUCTOR_BLOCK_TITLE = 'Personalise your rose bouquet with your choice of roses, colour and stem quantity';

const STRIPE_MOBILE_STATUS_DELAY = 1000;

const PRODUCTION_HOST = 'myflowers.co.uk';

const ONE_DIGIT_DAY_MONTH_LIMIT = 10;

const SUBSCRIBE_INVALID_EMAIL = 'The email must be a valid email address.';

const INTERVAL_DAYS_RANGE_OFFSET = 7 * 7;

const EMPTY_CART_MAP = {
  positions: [],
  promo_code: { code: '', discount: '' },
  position_cost: '',
  total_cost: ''
};

const EMPTY_GIFT_MAP = {
  seo: {},
  main: {},
  list: [],
  is_basket_has_gift: false
};

const DESCRIPTION_TEXT =
  'Please note, the selected arrangement is available for Same-Day delivery only within London; To any  address in the UK will be delivered next day';
const SUBSTITUTION_TEXT = `Our Bouquets are subject to availability. In the event of any supply difficulties, we reserve the right to substitute with a product of equivalent value and/or quality without notice. Where possible we may contact you to agree a suitable substitution.\n
The images of the Bouquets on our online shop are for illustrative purposes only. Although we have made every effort to display the colours accurately, we cannot guarantee that your computer's display of the colours accurately reflects the colour of the Bouquets. The colour of your Bouquet may vary slightly from those images.`;
const SUBSTITUTION_TEXT_COUNT = { desktop: 251, mobile: 94 };

const TOO_MANY_PROMOCODE_ATTEMPTS_MSG =
  'There are too many failed attempts to enter a promo code. Try it in a minute, please.';

const MIN_SCROLL_TO_UP_BUTTON = 50;
const AB_TESTING_COOKIE = 'ab_testing';
const AC_TESTING_COOKIE = 'ac_testing';

const PRODUCT_SIZE = {
  constructor: ['short', 'long'],
  regular: ['small', 'medium', 'large', 'extra large']
};

const GIFT_CARD_COOKIE = 'gift_card_from_basket';
const GIFT_CARD_POLICY_ID = 3;

const MAP_PROFILE_STATUSES = {
  BASKET: 'was created',
  ORDER: 'was created',
  PAYMENT: 'was created',
  PAID: 'was created',
  FAIL_PAID: 'was created',
  CONFIRMED: 'was confirmed',
  PACKED: 'is being collecting',
  COURIER_ASSIGNED: 'was assembled and waiting for the courier',
  DELIVERING: 'delivered to the courier',
  DELIVERED: 'was delivered',
  CANCELED: 'was canceled'
};

const BONUSES = {
  ERRORS: {
    ONLY_BONUSES: "You can't use a promo code and bonuses together. Only one offer can be applied per order."
  }
};

export {
  LIST_ITEM_VIEW_COUNT,
  FILTER_TYPES,
  AUTH_REG_STEPS,
  AUTH_REG_TYPES,
  AUTH_CODE_TIMER,
  CODE_INPUT_DEFAULT_COUNT,
  AUTH_REG_ERROR_MESSAGES,
  CHECKOUT_FORM_KEYS,
  INFO_BUTTONS,
  REVIEW_CARD_SYMBOLS_COUNT,
  CHECKOUT_INPUT_DELAY,
  PAGINATION,
  CATEGORY_PRODUCT_TYPES,
  NO_SCROLL_CLASS_NAME,
  ORDER_STATUS_TEXT,
  MAIN_PAGE_CONTENT_PARAMS,
  ALL_CATEGORIES_BUTTON,
  PRODUCT_CARD_IMAGE_SIZE,
  CHECK_ADDRESS_ERROR_DELAY,
  ADDRESS_MANUALLY_TEXT,
  ADDRESS_SEARCH_TEXT,
  SEARCH_INPUT_PLACEHOLDER,
  RELOAD_ORDER_DELAY,
  OUR_COOKIE,
  BANNER_COOKIE,
  AUTH_WITHOUT_SMS_COOKIE,
  AUTH_SMS_COOKIE,
  MONTH_LIST,
  CHECKOUT_INTERVAL_TAB_NAMES,
  SUBSCRIBE_MESSAGES,
  SUBSCRIBE_ACTION_TYPES,
  MONTH_DAY_COUNT,
  TODAY_DATE_COOKIE,
  FIXED_TIMEZONE,
  PAYMENT_METHOD_COOKIE,
  APPLE_PAY,
  GOOGLE_PAY,
  LINK_PAY,
  CONSTRUCTOR_TOOLTIP,
  TOKEN_REFRESH_ENDPOINT,
  CONSTRUCTOR_HEIGHT_COOKIE,
  CONSTRUCTOR_PACKAGE_COOKIE,
  SUBSCRIBE_VARIANTS,
  BONUS,
  EMAIL_DELAY,
  CART_TOOLTIP,
  CONSTRUCTOR_BLOCK_TITLE,
  STRIPE_MOBILE_STATUS_DELAY,
  CHECKOUT_STEPS,
  CHECKOUT_STEP_COOKIE,
  ONE_DIGIT_DAY_MONTH_LIMIT,
  PRODUCTION_HOST,
  SUBSCRIBE_INVALID_EMAIL,
  INTERVAL_DAYS_RANGE_OFFSET,
  MAIN_PAGE_LIMIT,
  EMPTY_CART_MAP,
  EMPTY_GIFT_MAP,
  DESCRIPTION_TEXT,
  SUBSTITUTION_TEXT,
  SUBSTITUTION_TEXT_COUNT,
  TOO_MANY_PROMOCODE_ATTEMPTS_MSG,
  MIN_SCROLL_TO_UP_BUTTON,
  AB_TESTING_COOKIE,
  AC_TESTING_COOKIE,
  PRODUCT_SIZE,
  GIFT_CARD_COOKIE,
  GIFT_CARD_POLICY_ID,
  MAP_PROFILE_STATUSES,
  BONUSES
};
