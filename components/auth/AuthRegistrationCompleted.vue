<template>
  <div class="layout completed">
    <div class="completed__info">
      <div class="completed__info-title">Registration passed successfully</div>
      <div class="completed__info-text">
        We are glad to welcome you<br />
        on our website!
      </div>
    </div>
    <div class="completed__btn">
      <app-button theme="green-whitely" stretch="full" @click="goToCatalog">Go shopping</app-button>
    </div>
  </div>
</template>
<script>
import AppButton from '~/components/shared/AppButton.vue';
import { EAuthComponents } from '~/constants/auth.ts';

export default {
  name: 'AuthRegistrationCompleted',

  components: {
    AppButton
  },

  methods: {
    goToCatalog() {
      if (!this.$device.isMobileOrTablet) {
        return;
      }

      this.$emit('change-step', EAuthComponents.LOGIN);
      this.$router.push({ name: 'index' });
    }
  }
};
</script>

<style lang="scss" scoped>
.completed {
  @include gt-sm {
    display: none;
  }

  @include lt-md {
    background: $color-green url('~/static/images/registration/reg-bg.png') 100% 60% no-repeat;
    height: calc(100vh - 44px);

    &__info {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-top: 12px;
    }

    &__info-title {
      font-family: $golos-bold;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0.01em;
      color: #ffffff;
    }

    &__info-text {
      font-family: $golos-regular;
      font-size: 16px;
      line-height: 24px;
      color: #eaeaea;
    }

    &__btn {
      position: absolute;
      bottom: 4px;
      width: 90%;
      right: 50%;
      transform: translate(50%, -50%);
    }
  }
}
</style>
