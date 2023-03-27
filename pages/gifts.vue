<template>
  <div class="layout gifts">
    <h2 class="gifts__title">{{ giftsTitle }}</h2>

    <div class="gifts__list">
      <app-card-gift v-for="(gift, idx) in giftsList" :key="idx" :gift="gift" />
    </div>
  </div>
</template>

<script>
import dataGifts from '~/data/gifts';
import AppCardGift from '~/components/AppCardGift.vue';

export default {
  name: 'GiftsPage',

  components: {
    AppCardGift
  },

  layout: 'empty',

  data() {
    return {
      giftsTitle: dataGifts.main.title,
      giftsList: dataGifts.list
    };
  }
};
</script>

<style scoped lang="scss">
.gifts {
  &__title {
    font-family: $Literata;
    font-style: normal;
    letter-spacing: -0.01em;
    color: $color-dark-grey;

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

  &__list {
    display: grid;

    @include gt-sm {
      grid-gap: 12px;
      grid-template-columns: repeat(auto-fill, minmax(24%, 1fr));
    }

    @include lt-sm {
      grid-gap: 8px;
      grid-template-columns: repeat(auto-fill, minmax(48%, 1fr));
    }
  }
}
</style>
