<template>
  <div class="footer-feedback">
    <div class="footer-feedback__title">
      {{ contacts.title }}
    </div>
    <div class="footer-feedback__items">
      <div v-for="(item, index) in contacts.phones" :key="index" class="footer-feedback__item">
        <a :href="`tel:${item.phone}`" class="footer-feedback__item-phone">{{ item.phone }}</a>
        <div class="footer-feedback__item-text">{{ item.text }}</div>
      </div>
    </div>
    <div class="footer-feedback__email">
      <app-email-button :email="email" />
    </div>
  </div>
</template>

<script>
import AppEmailButton from '@/components/shared/AppEmailButton.vue';

export default {
  name: 'AppFooterFeedback',

  components: {
    AppEmailButton
  },

  props: {
    contacts: {
      type: Object,
      default: () => ({})
    },

    email: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.footer-feedback {
  display: flex;
  flex-direction: column;

  @include gt-sm {
    gap: 16px;
  }

  @include lt-sm {
    padding-top: 24px;
    gap: 12px;
  }

  &__title {
    font-family: $golos-medium;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: $color-dark-grey;

    @include gt-sm {
      line-height: 20px;
    }

    @include lt-sm {
      line-height: 24px;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;

    @include gt-sm {
      margin-top: 6px;
      gap: 16px;
    }

    @include lt-sm {
      gap: 8px;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__item-phone {
    font-family: $golos-medium;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.01em;
    color: $color-dark-grey;
  }

  &__item-text {
    font-family: $golos-regular;
    letter-spacing: -0.01em;
    color: $color-white-grey;

    @include gt-sm {
      font-size: 14px;
      line-height: 20px;
    }

    @include lt-sm {
      font-size: 12px;
      line-height: 16px;
    }
  }

  &__email {
    @include gt-sm {
      display: none;
    }

    padding-top: 24px;
  }
}
</style>
