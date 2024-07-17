<template>
  <div class="gift-box">
    <div v-if="title" class="title">{{ title }}</div>
    <div v-if="discount" class="text">
      YOUR PERSONAL <span class="text--bold">{{ discount }}</span> DISCOUNT CODE
    </div>
    <div v-if="code" class="text text--bold">{{ code }}</div>
    <div v-if="date" class="text">
      Valid until <span class="text--bold">{{ date }}</span>
    </div>
    <div v-if="text" class="text">{{ text }}</div>
    <nuxt-link v-if="code" to="/" class="button">
      <app-button size="md" class="favorites__button">Choose a bouquet</app-button>
    </nuxt-link>
  </div>
</template>

<script>
import AppButton from '~/components/shared/AppButton.vue';

export default {
  name: 'AppGiftBox',
  components: { AppButton },

  props: {
    title: {
      type: String,
      default: ''
    },

    discount: {
      type: String,
      default: ''
    },

    code: {
      type: String,
      default: ''
    },

    date: {
      type: String,
      default: ''
    },

    text: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.gift-box {
  text-align: center;
  margin: 10px 0;
}

.title {
  font-family: $golos-bold;

  @include gt-sm {
    font-size: 24px;
    line-height: 28px;
  }

  @include lt-md {
    font-size: 20px;
    line-height: 24px;
  }
}

.text {
  font-family: $golos-regular;

  @include gt-sm {
    font-size: 16px;
    line-height: 24px;
    margin-top: 14px;
  }

  @include lt-md {
    font-size: 14px;
    line-height: 20px;
    margin-top: 12px;
  }

  &--bold {
    font-family: $golos-bold;
  }
}

.button {
  display: inline-block;
  margin: 10px auto;
}
</style>
