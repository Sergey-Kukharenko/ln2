<template>
  <div class="orders-empty">
    <img :src="img.src" :alt="img.alt" />
    <div class="group">
      <div class="title">
        {{ title }}
      </div>
      <div class="description">
        {{ description }}
      </div>
    </div>
    <nuxt-link :to="$options.ALL_CATEGORIES_BUTTON.path">
      <app-button size="md" class="button" stretch="full">Go shopping</app-button>
    </nuxt-link>
  </div>
</template>

<script>
import Vue from 'vue';

import AppButton from '~/components/shared/AppButton.vue';
import { ALL_CATEGORIES_BUTTON } from '~/constants';
import profile from '~/data/profile';

const { img, title, description } = profile.pages.orders.empty;
export default Vue.extend({
  name: 'ProfileOrdersEmpty',

  components: { AppButton },

  ALL_CATEGORIES_BUTTON,

  data() {
    return {
      img,
      title,
      description
    };
  }
});
</script>

<style scoped lang="scss">
.orders-empty {
  margin: 0 auto;
  text-align: center;

  @include gt-sm {
    max-width: 279px;
    padding: 24px;
  }

  @include lt-md {
    max-width: 246px;
    padding: 31px 0;
  }
}

img {
  display: block;
  margin: 0 auto;

  @include gt-sm {
    max-width: 143px;
  }

  @include lt-md {
    max-width: 99px;
  }
}

.group {
  @include gt-sm {
    margin-top: 32px;
  }

  @include lt-md {
    margin-top: 24px;
  }
}

.title {
  font-family: $golos-bold;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.01em;
  max-width: 218px;
  margin: 0 auto;
}

.description {
  font-family: $golos-regular;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  max-width: 218px;

  @include gt-sm {
    margin: 10px auto 0;
  }

  @include lt-md {
    margin: 5px auto 0;
  }
}

.button {
  @include gt-sm {
    margin-top: 30px;
  }

  @include lt-md {
    margin-top: 21px;
  }
}
</style>
