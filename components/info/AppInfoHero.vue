<template>
  <div class="hero">
    <div class="container layout">
      <div class="hero__items">
        <div v-for="(item, index) in items" :key="index" class="hero__item">
          <div class="hero__item-title">{{ item.title }}</div>
          <div class="hero__item-text">{{ item.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppInfoHero',

  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.hero {
  background: $bg-grey;

  @include gt-sm {
    padding: 40px 0;
  }

  @include lt-md {
    padding: 32px 0;
    margin: 32px 0 0;
  }

  &__items {
    display: flex;

    @include gt-sm {
      gap: 40px;
    }

    @include lt-md {
      flex-direction: column;
      gap: 32px;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 12px;
  }

  &__item-title {
    font-family: $golos-medium;
    font-style: normal;
    font-weight: 600;
    color: $color-dark-green;

    @include gt-sm {
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0.01em;
    }

    @include lt-md {
      font-size: 20px;
      line-height: 24px;
    }
  }

  &__item-text {
    flex: 1;
    font-family: $golos-regular;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: $color-dark-grey;

    @include gt-sm {
      white-space: pre-wrap;
    }
  }
}
</style>
