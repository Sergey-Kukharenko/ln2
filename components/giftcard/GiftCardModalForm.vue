<template>
  <div class="giftcard-form">
    <div class="giftcard-form__header">
      <svg-icon class="giftcard-form__icon" name="arrow-green" @click="$emit('close-modal')" />
      {{ modalTitle }}
    </div>
    <div class="giftcard-form__body">
      <app-textarea
        v-model="form.message"
        auto-size
        class="gift__textarea"
        :max="400"
        placeholder="Write your personal gift message"
      />
      <gift-card-occasions
        :gift-card-list="giftCards"
        :selected-card-id="getGiftCardId"
        has-arrows
        @select="onSelectCard"
      />
    </div>
    <div class="giftcard-form__footer">
      <app-button theme="green" stretch="full" @click="onSubmit">{{ buttonText }}</app-button>
    </div>
  </div>
</template>

<script>
import GiftCardOccasions from '~/components/giftcard/GiftCardOccasions.vue';
import AppButton from '~/components/shared/AppButton.vue';
import { GIFT_CARD_COOKIE } from '~/constants';

export default {
  components: {
    AppButton,
    AppTextarea: () => import('~/components/shared/AppTextarea.vue'),
    GiftCardOccasions
  },

  props: {
    text: {
      type: String,
      default: ''
    },

    isEditable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      form: {
        message: this.text
      },

      giftCardPayload: {
        productId: '',
        productSlug: ''
      }
    };
  },

  computed: {
    giftCards() {
      return this.$accessor.gifts.getGiftCards;
    },

    getGiftCardId() {
      return this.$accessor.cart.getGiftCard?.offer_id || '';
    },

    modalTitle() {
      return this.isEditable ? 'Your gift card' : 'Choose your gift card';
    },

    buttonText() {
      return this.isEditable ? 'Save' : 'Add';
    }
  },

  methods: {
    onSubmit() {
      try {
        this.$accessor.cart.addToCart({ giftText: this.form.message, ...this.giftCardPayload });
        this.$emit('close-modal');
        this.$cookies.set(GIFT_CARD_COOKIE, 'true');
        this.scrollToTop();
      } catch (err) {
        console.error(err);
        this.$cookies.remove(GIFT_CARD_COOKIE);
      }
    },

    onSelectCard({ _init, ...payload }) {
      this.giftCardPayload = payload;
    },

    scrollToTop() {
      if (this.$device.isDesktop) {
        return;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script>

<style lang="scss" scoped>
.giftcard-form {
  box-sizing: border-box;
  width: 100%;
  position: relative;

  @include gt-sm {
    width: 712px;
    padding: 0 24px 24px 24px;
    gap: 16px;
  }

  @include lt-md {
    height: 100%;
    padding: 24px 16px 16px 16px;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: $Literata;
    font-weight: 700;
    letter-spacing: -0.01em;

    @include gt-sm {
      font-size: 24px;
      line-height: 28.8px;
      height: 77px;
      border-bottom: 1px solid #eaeaea;
    }

    @include lt-md {
      font-size: 20px;
      line-height: 24px;
      height: 40px;
    }
  }

  &__icon {
    @include gt-sm {
      display: none;
    }

    @include lt-md {
      width: 16px;
      height: 16px;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;

    @include gt-sm {
      margin-top: 24px;
      margin-bottom: 32px;
      gap: 32px;
    }

    @include lt-md {
      margin-top: 4px;
      gap: 16px;
    }
  }

  &__footer {
    @include lt-md {
      margin-top: 12px;
      width: 100%;
      box-sizing: border-box;
      padding: 16px 0;
    }
  }
}
</style>
