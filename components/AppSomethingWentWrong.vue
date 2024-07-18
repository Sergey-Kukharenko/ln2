<template>
  <div class="something-went-wrong">
    <h3 class="something-went-wrong__title">Oops, we have a problem...</h3>
    <p class="something-went-wrong__description">Something went wrong, reload the page or try again later</p>
  </div>
</template>

<script>
export default {
  name: 'AppSomethingWentWrong'
};
</script>

<style scoped lang="scss">
.something-went-wrong {
  text-align: center;

  &__title {
    font-family: $golos-bold;
    margin: 0;

    @include gt-sm {
      font-size: 24px;
      line-height: 28px;
    }

    @include lt-md {
      font-size: 18px;
      line-height: 22px;
    }
  }

  &__description {
    font-family: $golos-regular;

    @include gt-sm {
      font-size: 16px;
      line-height: 24px;
      margin: 8px 0 0;
    }

    @include lt-md {
      max-width: 230px;
      font-size: 14px;
      line-height: 18px;
      margin: 8px auto 0;
    }
  }
}
</style>
