<template>
  <div class="gift">
    <div class="gift__title">
      <div>Included gift card</div>
      <div class="gift__title-tag">Free</div>
    </div>
    <!-- <div class="gift__cover">
          <svg-icon class="gift__post-desktop" name="post-card-green" />
          <div>Choose cover</div>
        </div>
        <div class="gift__cover-mobile">
          <div class="gift__cover-mobile-row">
            <svg-icon class="gift__post-mobile" name="post-card-green" />
            <div>Choose cover</div>
          </div>
          <svg-icon class="gift__icon-chevron-right" name="chevron-right" />
        </div> -->
    <div class="gift__container">
      <div class="gift__from-to">
        <!-- <div style="flex-grow: 1">
              <app-input size="x-large" :value="comment" placeholder="Card to:" @change="giftHandler" />
            </div> -->
        <!-- <div style="flex-grow: 1">
              <app-input size="x-large" value="" placeholder="From:" />
            </div> -->
      </div>
      <div class="gift__comment">
        <textarea
          v-model="gift"
          class="gift__textarea"
          placeholder="Your message on a gift card:"
          @blur="giftHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import Vue from 'vue';
// import AppInput from '~/components/shared/AppInput';

import { CHECKOUT_INPUT_DELAY } from '~/constants';

export default Vue.extend({
  name: 'CheckoutGiftCard',

  // components: { AppInput },

  data() {
    return {
      gift: ''
    };
  },

  computed: {
    giftData() {
      return this.$accessor.checkout.getCheckout?.gift ?? '';
    }
  },

  mounted() {
    this.gift = this.giftData;
  },

  methods: {
    giftHandler: debounce(function () {
      this.$accessor.checkout.setCheckoutOther({ gift: this.gift });
    }, CHECKOUT_INPUT_DELAY)
  }
});
</script>

<style lang="scss" scoped>
.gift {
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  border-radius: 12px;

  &__title {
    display: flex;
    box-sizing: border-box;
    font-family: $golos-medium;
    font-weight: 500;
    letter-spacing: -0.02em;

    @include gt-sm {
      font-size: 14px;
      line-height: 18px;
      padding: 12px 0 0 12px;
    }

    @include lt-lg {
      font-size: 12px;
      line-height: 16px;
      padding: 11px 0 0 16px;
    }
  }

  &__title-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 19px;
    font-family: $golos-regular;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 0.01em;
    color: #ffffff;
    background-color: #26ad4f;
    border-radius: 6px;
    margin-left: 7px;
    position: relative;
    top: -1px;
  }

  &__container {
    flex-grow: 1;
  }

  &__cover {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 9px;
    background-color: $bg-green;
    border-radius: 12px;
    width: 160px;

    font-family: $golos-medium;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: -0.01em;
    color: #009959;

    @include lt-lg {
      display: none;
    }
  }

  &__cover-mobile {
    display: none;

    @include lt-lg {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background: #eafbeb;
      border-radius: 10px;
      height: 48px;
      padding: 0 16px;

      font-family: $golos-regular;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.01em;
      color: $color-dark-green;
    }
  }

  &__cover-mobile-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  &__from-to {
    display: flex;
    flex-direction: column;
    gap: 8px;

    @include lt-lg {
      flex-direction: row;
      align-items: center;
      gap: 12px;
    }
  }

  &__comment {
    display: flex;
  }

  &__textarea {
    overflow: auto;
    border-radius: 12px;
    flex: 1;
    font-family: $golos-regular;
    background: $bg-grey;
    color: $color-dark-grey;
    // background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23EAEAEA' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    border: none;
    outline: none;
    resize: none;

    @include gt-sm {
      font-size: 14px;
      line-height: 18.2px;
      letter-spacing: -0.01em;
      min-height: 65px;
      padding: 8px 14px 16px 14px;
    }

    @include lt-lg {
      font-size: 12px;
      line-height: 15.6px;
      letter-spacing: -0.02em;
      min-height: 52px;
      padding: 4px 16px 14px 16px;
    }
  }

  &__post-desktop {
    width: 76px;
    height: 73px;
  }

  &__post-mobile {
    width: 24px;
    height: 23px;
  }

  &__icon-chevron-right {
    width: 16px;
    height: 16px;
  }
}
</style>
