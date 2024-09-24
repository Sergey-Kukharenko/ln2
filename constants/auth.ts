import { SECOND_TO_MS } from '~/constants/time';

const enum EAuthComponents {
  LOGIN = 'AuthLogin',
  CODE = 'AuthCode',
  REGISTRATION = 'AuthRegistration',
  REGISTRATION_COMPLETED = 'AuthRegistrationCompleted',
  CODE_NOT_RECEIVED = 'AuthCodeNotReceived',
  CONTACT_US = 'AuthContactUs'
}

const NOT_RECIEVED_DESCRIPTION_TEXT = {
  desktop: 'If you have entered your phone number, but the SMS message does not arrive, contact our Whatsapp manager:',
  mobile: 'If you have entered your phone number, but the SMS does not arrive, contact support:'
} as const;

const VALIDATION_MESSAGES = {
  email: 'Invalid E-mail format',
  phone: 'Enter the correct phone number',
  code: 'The code is incorrect',
  incorrect: 'Incorrect',
  empty: 'Please fill all fields to continue',
  gender: 'You need specify your gender'
} as const;

const GENDERS_OPTIONS = [
  {
    name: 'Female',
    img: '/icons/genders/female.png',
    value: 'female'
  },
  {
    name: 'Male',
    img: '/icons/genders/male.png',
    value: 'male'
  },
  {
    name: 'Prefer not to say',
    img: null,
    value: 'other'
  }
] as const;

const AUTH_CODE_TIMER_STEP = SECOND_TO_MS;
const AUTH_CODE_TIMER = {
  step: SECOND_TO_MS,
  duration: SECOND_TO_MS * 40
} as const;

const CODE_NOT_RECEIVED_TEXT = 'I haven’t received the code';

const AUTH_CORRECT_CODE = '1234';

const MIN_PHONE_LENGTH = 7;

export {
  EAuthComponents,
  AUTH_CORRECT_CODE,
  AUTH_CODE_TIMER,
  AUTH_CODE_TIMER_STEP,
  CODE_NOT_RECEIVED_TEXT,
  GENDERS_OPTIONS,
  NOT_RECIEVED_DESCRIPTION_TEXT,
  VALIDATION_MESSAGES,
  MIN_PHONE_LENGTH
};
