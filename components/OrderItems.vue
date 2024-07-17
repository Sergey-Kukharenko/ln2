<template>
  <div class="order-items">
    <div v-for="(item, index) in list" :key="index" class="item">
      <div class="item__picture">
        <app-discount-badge v-if="isDiscountAvailable(item)" scale="0.35" offset-top="-10" offset-left="-24" />

        <img
          :src="
            useSizedImage({
              realId: item.offer_real_id,
              sizeName: $options.IMG_SIZES_MAP.min,
              imgName: item.image.filename
            })
          "
          class="item__img"
          :alt="item.image.alt_text"
        />
      </div>
      <div class="item__text">{{ item.offer_title }}</div>
    </div>
  </div>
</template>

<script>
import { IMG_SIZES_MAP } from '~/constants/image-sizes';
import { useSizedImage } from '~/helpers';

export default {
  name: 'OrderItems',

  components: {
    AppDiscountBadge: () => import('~/components/shared/AppDiscountBadge.vue')
  },

  props: {
    list: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    useSizedImage,

    isDiscountAvailable(item) {
      return Boolean(item.discount);
    }
  },

  IMG_SIZES_MAP
};
</script>

<style scoped lang="scss">
.order-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;

  .item {
    display: flex;
    align-items: center;
    gap: 8px;

    &__picture {
      position: relative;
      width: 48px;
      height: 48px;
    }

    &__img {
      width: 100%;
      height: 100%;
      border-radius: 12px;
    }

    &__text {
      flex: 1;
      font-family: $golos-regular;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.01em;
      color: $color-dark-grey;
    }
  }
}
</style>
