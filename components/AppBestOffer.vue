<template>
  <section class="best-offer">
    <div v-if="roundedTop" class="space"></div>
    <div class="best-offer__panel" :style="panelStyles">
      <div class="best-offer__panel-col info">
        <div class="info__text">
          Get the latest special <a href="#" class="link">offers</a> from
          <nuxt-link to="/" class="link">MyFlowers</nuxt-link> in your inbox.
        </div>
      </div>

      <div>
        <app-input
          v-model="email"
          size="x-large"
          placeholder="Email"
          :success="success"
          :error="error"
          theme="white"
          :disabled="disabled"
          @input="onInput"
        >
          <template #right>
            <cart-button
              size="small"
              theme="green"
              align="center"
              not-change
              :disabled="disabled"
              @click="handleSubscribe"
            >
              Use
            </cart-button>
          </template>
        </app-input>
      </div>
    </div>
  </section>
</template>

<script>
import CartButton from '~/components/CartButton.vue';
import AppInput from '~/components/shared/AppInput.vue';
import subscribe from '~/mixins/subscribe.vue';

export default {
  name: 'AppBestOffer',
  components: { CartButton, AppInput },

  mixins: [subscribe],

  props: {
    roundedTop: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      agreeEmailReceive: true,
      options: {
        email_subscription: true
      },
      subscribeModule: 'footer'
    };
  },

  computed: {
    panelStyles() {
      return {
        paddingTop: this.roundedTop ? '62px' : 0
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.best-offer {
  @include gt-sm {
    max-width: 252px;
  }

  &__panel {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 20px;

    .info {
      display: flex;
      flex-direction: column;
      gap: 8px;

      &__text {
        font-family: $golos-bold;
        font-size: 16px;
        line-height: 20px;
        color: $color-dark-grey;

        .link {
          color: $color-green;
        }
      }
    }
  }
  .space {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 38px;
    z-index: 2;
    border-radius: 0 0 24px 24px;
    background-color: #ffffff;
  }
}
</style>
