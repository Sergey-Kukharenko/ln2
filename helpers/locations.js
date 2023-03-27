import { SUGGESTION_MAP } from '~/constants/locations';

const changeSuggestionLine = (suggestion) => {
  const address = suggestion.split(', ');
  const unitIndex = address.findIndex((el) => el.includes('Unit'));
  const isApartamentExist = !address[0].includes(SUGGESTION_MAP.apartment) || !address[0].includes(SUGGESTION_MAP.flat);

  if (unitIndex !== -1) {
    const unitText = address.splice(unitIndex, 1);
    address.splice(address.length - 2, 0, unitText[0]);
  }

  if (!isApartamentExist) {
    return;
  }

  const [flat, street, ...props] = address;

  return [street, flat, ...props].join(', ');
};

export { changeSuggestionLine };
