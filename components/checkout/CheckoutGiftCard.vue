<template>
  <div class="gift">
    <app-checkbox
      v-model="form.checkbox"
      class="gift__checkbox"
      name="checkbox_1"
      initial-icon-name="checkbox-on-v2"
      align="center"
      @change="handleCheckbox"
      ><span class="gift__checkbox-text"
        >Аdd a gift card <span class="gift__checkbox-price">(+2.99)</span></span
      ></app-checkbox
    >
    <app-textarea
      v-model.trim="form.message"
      class="gift__textarea"
      :max="400"
      theme="white"
      placeholder="Write your personal gift message"
      auto-size
      @input="onInput"
      @blur="onBlur"
    />
    <gift-card-occasions :gift-card-list="giftCardList" :selected-card-id="getGiftCardId" @select="onSelectCard" />
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import Vue from 'vue';

import GiftCardOccasions from '~/components/giftcard/GiftCardOccasions.vue';
import AppCheckbox from '~/components/shared/AppCheckbox.vue';
import { GIFT_CARD_COOKIE } from '~/constants';

export default Vue.extend({
  name: 'CheckoutGiftCard',

  components: {
    AppCheckbox,
    GiftCardOccasions,
    AppTextarea: () => import('~/components/shared/AppTextarea.vue')
  },

  props: {
    giftCardList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      form: {
        checkbox: '',
        message: ''
      },

      giftCardPayload: {
        productId: '',
        productSlug: ''
      }
    };
  },

  computed: {
    getGiftCardId() {
      return this.$accessor.checkout.getGiftCard?.offer_id || '';
    }
  },

  mounted() {
    if (!this.getGiftCardId) {
      return;
    }

    this.initForm();
  },

  methods: {
    initForm() {
      this.form.message = this.$accessor.checkout.getGiftCard?.gift_card_text || '';
      this.form.checkbox = 'checkbox_1';
    },

    onSelectCard({ init = false, ...payload }) {
      this.giftCardPayload = payload;

      if (init) {
        return;
      }

      this.form.checkbox = 'checkbox_1';
      this.handleCheckbox('checkbox_1');
    },

    handleCheckbox: debounce(function (value) {
      const action = value ? 'addToCart' : 'removeFromCart';
      try {
        this.$accessor.checkout.SET_PENDING_STATUS(true);
        this.onSubmit(action);
      } catch (err) {
        console.error(err);
      }
    }, 100),

    onBlur() {
      if (!this.form.checkbox) {
        return;
      }

      this.onSubmit();
    },

    onInput() {
      this.$accessor.checkout.SET_PENDING_STATUS(true);
      if (this.form.message && !this.form.checkbox) {
        this.form.checkbox = 'checkbox_1';
        this.handleCheckbox('checkbox_1');
      }
    },

    async onSubmit(action = 'addToCart') {
      this.$cookies.remove(GIFT_CARD_COOKIE);
      await this.$accessor.cart[action]({ giftText: this.form.message, ...this.giftCardPayload });
      await this.$accessor.checkout.updateCheckout();
    }
  }
});
</script>

<style lang="scss" scoped>
.gift {
  display: flex;
  flex-direction: column;
  background: $bg-green;
  border-radius: 12px;

  gap: 12px;

  @include gt-sm {
    padding: 16px;

    &__textarea {
      margin-bottom: 8px;
    }
  }

  @include lt-md {
    width: calc(100% + 16px);
    margin-left: -8px;
    padding: 12px;
  }

  &__checkbox {
    font-family: $Literata;

    &-text {
      letter-spacing: -0.01em;
      font-weight: 500;

      @include gt-sm {
        font-size: 20px;
        line-height: 24px;
      }

      @include lt-md {
        font-size: 16px;
        line-height: 19.2px;
      }
    }

    &-price {
      font-weight: 700;
      letter-spacing: -0.01em;

      @include gt-sm {
        font-size: 20px;
        line-height: 24px;
      }

      @include lt-md {
        font-size: 16px;
        line-height: 19.2px;
      }
    }
  }
}
</style>
