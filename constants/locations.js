const SUGGESTION_MAP = Object.freeze({
  apartment: 'Apartament',
  flat: 'Flat',
  unit: 'Unit'
});

const API_URL = process.env.idealPostcodesAutocompleteUrl;
const API_KEY = process.env.idealPostcodesKey;

export { SUGGESTION_MAP, API_URL, API_KEY };
