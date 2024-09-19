<template>
  <div class="info">
    By clicking on the "Get an SMS code" button, you consent to the processing of personal data, the provision of data
    to
    <a href="https://myflowers.co.uk/privacy-policy" target="_blank" rel="noopener noreferrer" class="info__link"
      >Analytics Services</a
    >, and consent to the
    <a href="https://myflowers.co.uk/privacy-policy" target="_blank" rel="noopener noreferrer" class="info__link"
      >Privacy Policy</a
    >.
  </div>
</template>

<script>
export default {
  name: 'AuthLoginPersonalDataTerms'
};
</script>

<style lang="scss" scoped>
.info {
  font-family: $golos-regular;
  text-align: center;
  color: $color-white-grey;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
  letter-spacing: -0.01em;

  &__link {
    color: $color-green;
  }
}
</style>
