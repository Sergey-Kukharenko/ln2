<template>
  <div class="layout gifts">
    <div class="gifts__container">
      <div class="gifts__container-header">
        <h2 class="gifts__container-title">{{ title }}</h2>
        <nuxt-link v-if="$device.isMobileOrTablet" to="/basket" class="gifts__container-close">
          {{ changeableText }}
        </nuxt-link>
      </div>

      <app-list-gifts v-slot="slotProps" :list="list">
        <app-card-gift :gift="{ ...slotProps }" />
      </app-list-gifts>
    </div>
    <nuxt-link to="/basket">
      <app-button theme="green" class="gifts__button">{{ changeableText }}</app-button>
    </nuxt-link>
  </div>
</template>

<script>
import Vue from 'vue';

import AppCardGift from '~/components/gifts/AppCardGift.vue';
import AppListGifts from '~/components/gifts/AppListGifts.vue';
import AppButton from '~/components/shared/AppButton.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'GiftsPage',

  components: {
    AppListGifts,
    AppCardGift,
    AppButton
  },

  layout: (ctx) => (ctx.$device.isMobileOrTablet ? 'empty' : 'default'),

  async fetch() {
    await this.fetchGifts();
  },

  head() {
    return {
      title: this.seo?.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.seo?.description
        }
      ]
    };
  },

  computed: {
    ...accessorMapper('gifts', ['gifts']),

    seo() {
      return this.gifts?.seo;
    },

    title() {
      return this.gifts?.main?.title;
    },

    list() {
      return this.gifts?.list;
    },

    isBasketHasGifts() {
      return this.gifts?.is_basket_has_gift;
    },

    changeableText() {
      return this.isBasketHasGifts ? 'Continue' : 'Skip';
    }
  },

  methods: {
    ...accessorMapper('gifts', ['fetchGifts'])
  }
});
</script>

<style scoped lang="scss">
.gifts {
  &__container-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__container-title {
    font-family: $Literata;
    font-style: normal;
    letter-spacing: -0.01em;
    color: $color-dark-grey;
    margin: 0;

    @include gt-sm {
      font-weight: 600;
      font-size: 32px;
      line-height: 40px;
    }

    @include lt-sm {
      font-weight: 700;
      font-size: 20px;
      line-height: 120%;
    }
  }

  &__container-close {
    @include lt-sm {
      font-family: $golos-medium;
      font-size: 14px;
      line-height: 18px;
      color: $color-green;
    }
  }

  &__button {
    position: sticky;
    margin: auto;
    z-index: 4;

    @include gt-sm {
      width: 400px;
      bottom: 27px;
    }

    @include lt-sm {
      width: calc(100% - 28px);
      bottom: 12px;
    }
  }
}
</style>
