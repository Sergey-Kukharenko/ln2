<template>
  <div class="card-gift">
    <div class="card-gift__figure">
      <img :src="gift.img" :alt="gift.title" class="card-gift__figure-image" />
    </div>
    <div class="card-gift__title">
      {{ gift.title }}
    </div>
    <div class="card-gift__content">
      <div class="card-gift__price">£ {{ gift.price }}</div>
      <app-button theme="green" size="xs" :stretch="changeableStretch">Add</app-button>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/shared/AppButton.vue';

export default {
  name: 'AppCardGift',

  components: { AppButton },

  props: {
    gift: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    changeableStretch() {
      return this.$device.isMobileOrTablet ? 'full' : 'fix';
    }
  }
};
</script>

<style scoped lang="scss">
.card-gift {
  &__figure {
    display: flex;
    background: $bg-grey;
    border-radius: 19.575px;

    @include gt-sm {
      min-height: 261px;
    }

    @include lt-sm {
      min-height: 140px;
    }
  }

  &__figure-image {
    margin: auto;
    mix-blend-mode: darken;

    @include gt-sm {
      width: 180px;
    }

    @include lt-sm {
      width: 96px;
    }
  }

  &__title {
    font-family: $golos-regular;
    letter-spacing: -0.02em;
    color: $color-dark-grey;

    @include gt-sm {
      font-size: 16px;
      line-height: 18px;
      margin: 12px 0 10px;
    }

    @include lt-sm {
      min-height: 32px;
      font-size: 12px;
      line-height: 16px;
      margin: 8px 0 4px;
    }
  }

  &__content {
    @include gt-sm {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__price {
    color: $color-dark-grey;

    @include gt-sm {
      font-family: $golos-bold;
      font-size: 18px;
      line-height: 22px;
      letter-spacing: -0.02em;
    }

    @include lt-sm {
      font-family: $golos-medium;
      font-size: 14px;
      line-height: 18px;
      letter-spacing: -0.01em;
      margin-bottom: 8px;
    }
  }
}
</style>
