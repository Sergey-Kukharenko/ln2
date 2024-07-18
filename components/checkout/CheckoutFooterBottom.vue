<template>
  <div class="footer-bottom">
    <div class="layout">
      <div class="footer-bottom__content">
        <div class="footer-bottom__content logo">
          <svg-icon class="logo__icon" name="logo-grey" />
        </div>
        <!-- <app-policy /> -->
        <div class="text">
          <div class="text--desktop">
            {{ getFooter?.rights }}
          </div>
          <div class="text--mobile">
            MyFlowers LTD - Flower delivery<br />
            Service in the UK
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import { accessorMapper } from '~/store';

// import AppPolicy from '@/components/AppPolicy.vue';

export default Vue.extend({
  name: 'CheckoutFooterBottom',

  // components: { AppPolicy },

  computed: {
    ...accessorMapper('layout', ['getFooter'])
  }
});
</script>

<style lang="scss" scoped>
.footer-bottom {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: $bg-grey;

  @include gt-sm {
    height: 96px;
    padding: 24px 0;
  }

  @include lt-md {
    height: 119px;
    padding: 28px 0;
  }

  .layout {
    width: 100%;

    @include gt-sm {
      padding-left: 0;
    }
  }

  &__content {
    height: 100%;

    @include gt-sm {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .logo {
    @include lt-lg {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    &__icon {
      @include gt-sm {
        cursor: pointer;
      }

      user-select: none;
      width: 122px;
      height: 38px;
    }
  }
}

.text {
  font-family: $golos-regular;

  &--desktop {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.01em;
    color: $color-white-grey;

    @include gt-sm {
      text-align: right;
      margin-left: 10px;
    }

    @include lt-lg {
      display: none;
    }
  }

  &--mobile {
    @include gt-sm {
      display: none;
    }

    font-family: $golos-regular;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.02em;
    text-align: center;
    color: $color-dark-grey;
    margin: 8px auto;
  }
}
</style>
