<template>
  <a
    class="trustpilot"
    :class="{ 'hided-text': hideText }"
    href="https://www.trustpilot.com/review/myflowers.co.uk?utm_medium=trustbox&utm_source=MicroStar"
    target="_blank"
  >
    <div class="trustpilot__text">Rated {{ rate }}/5</div>
    <app-trustpilot-stars :rate="rate" />
    <svg-icon class="trustpilot__icon" name="trustpilot-logo" />
  </a>
</template>

<script>
import AppTrustpilotStars from './AppTrustpilotStars.vue';

export default {
  components: { AppTrustpilotStars },

  props: {
    hideText: {
      type: Boolean
    }
  },

  data() {
    return {
      rate: 4.5
    };
  }
};
</script>

<style lang="scss">
.trustpilot {
  display: flex;
  align-items: center;

  &__text {
    font-family: $golos-regular;
    color: $color-dark-grey;

    @include gt-sm {
      font-size: 16px;
      line-height: 110%;
      letter-spacing: -0.32px;
    }

    @include lt-md {
      font-size: 14px;
      line-height: 130%;
      letter-spacing: -0.14px;
    }
  }

  &__icon {
    @include gt-sm {
      width: 89.041px;
      height: 21.263px;
    }

    @include lt-md {
      width: 62.812px;
      height: 15px;
    }
  }

  &.hided-text {
    & .trustpilot__text {
      display: none;
    }
  }
}
</style>
