<template>
  <div class="not-found">
    <div class="not-found__status-code">{{ error.statusCode }}</div>
    <h3 class="not-found__title">{{ error.message }}</h3>
    <p class="not-found__description">Unfortunately, we can't find such a page</p>
  </div>
</template>

<script>
export default {
  name: 'AppNotFound',

  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style scoped lang="scss">
.not-found {
  text-align: center;

  &__status-code {
    color: #cccccc;

    @include gt-sm {
      font-family: $golos-extra-bold;
      font-size: 120px;
      line-height: 120px;
    }

    @include lt-md {
      font-family: $golos-bold;
      font-size: 64px;
      line-height: 77px;
      letter-spacing: -0.02em;
    }
  }

  &__title {
    font-family: $golos-bold;

    @include gt-sm {
      font-size: 24px;
      line-height: 28px;
      margin: 24px 0 0;
    }

    @include lt-md {
      font-size: 18px;
      line-height: 22px;
      margin: 4px 0 0;
    }
  }

  &__description {
    font-family: $golos-regular;

    @include gt-sm {
      font-size: 16px;
      line-height: 24px;
      margin: 6px 0 0;
    }

    @include lt-md {
      max-width: 220px;
      font-size: 14px;
      line-height: 18px;
      margin: 8px auto 0;
    }
  }
}
</style>
