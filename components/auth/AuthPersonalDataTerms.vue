<template>
  <div class="info">
    By clicking on the button, you agree to the <br />
    <a href="https://myflowers.co.uk/privacy-policy" target="_blank" rel="noopener noreferrer" class="info__link"
      >Terms of personal data processing</a
    >
  </div>
</template>

<script>
export default {
  name: 'AuthPersonalDataTerms'
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
