const isEmailValid = (email) =>
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
    email
  );

const isPhoneValid = (number) => /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/.test(number);

const isNumberKey = (e) => {
  const charCode = e.charCode || e.which || e.keyCode;

  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    e.preventDefault();

    return false;
  }

  return true;
};

export { isEmailValid, isPhoneValid, isNumberKey };
