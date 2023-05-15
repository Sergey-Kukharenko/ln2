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

const AUTH_TYPES = {
  email: {
    name: 'email',
    type: 'E-mail',
    codeName: 'code'
  },
  phone: {
    name: 'phone',
    type: 'phone',
    codeName: 'SMS',
    extraCodeName: 'SMS-code'
  }
};

const AUTH_REG_TYPES = ['phone', 'email'];

const AUTH_CODE_TIMER = {
  step: 1000,
  duration: 40000
};

const AUTH_CORRECT_CODE = '1234';

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
    images: ['/images/info/avatar-female.webp', '/images/info/avatar-male.webp']
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

const CHECKOUT_INPUT_DELAY = 500;

const PAGINATION = {
  limit: 12,
  btnCount: 5,
  blindValue: 3
};

const CATEGORY_PRODUCT_TYPES = ['Category', 'Filter'];

const NO_SCROLL_CLASS_NAME = 'noscroll';

const ORDER_STATUS_TEXT = {
  paid: { title: 'The order is paid', text: 'Expect delivery' },
  inProcess: { title: 'Processing the payment', text: 'Please wait' },
  notPaid: { title: 'The order is awaiting payment', text: 'Please pay for the order' },
  failed: { title: 'Transaction failed', text: 'Please try again, or use a different payment method' }
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
  text: 'Go to catalog'
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
  search: 'Search your address'
};

const RELOAD_ORDER_DELAY = {
  1: 3000,
  2: 5000,
  3: 7000,
  4: 15000,
  5: 30000
};

const OUR_COOKIE = 'our-cookie';
const AUTH_WITHOUT_SMS_COOKIE = 'auth-without-sms';

export {
  LIST_ITEM_VIEW_COUNT,
  FILTER_TYPES,
  AUTH_REG_STEPS,
  AUTH_REG_TYPES,
  AUTH_CODE_TIMER,
  CODE_INPUT_DEFAULT_COUNT,
  AUTH_CORRECT_CODE,
  AUTH_REG_ERROR_MESSAGES,
  AUTH_TYPES,
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
  AUTH_WITHOUT_SMS_COOKIE
};
