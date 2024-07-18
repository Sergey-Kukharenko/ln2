const VALIDATE_MESSAGES = {
  alpha: 'Alphanumeric characters only',
  email: 'Must be a valid email address',
  minLength: 'Must have a length no less than min',
  required: 'Required field',
  wrong: 'Something went wrong'
} as const;

const INTERVAL_VALIDATE_MESSAGES = {
  date: 'Please select delivery date',
  time: 'Please select delivery time'
} as const;

const LOCATION_NOT_FOUND_MESSAGE = 'Didn’t find similar address';

export { VALIDATE_MESSAGES, LOCATION_NOT_FOUND_MESSAGE, INTERVAL_VALIDATE_MESSAGES };
