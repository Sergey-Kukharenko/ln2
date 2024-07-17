<template>
  <div class="offers">
    <div v-for="(item, idx) in offers" :key="item.id" class="offers__item item" @click="onChange(item, idx)">
      <div class="button" :class="{ active: idx === selectedOffer }">
        <div class="figure">
          <div class="radio">
            <div class="radio__shape"></div>
          </div>
          <div class="figcaption">
            {{ item.title }}
            <div v-if="isStandard(item.title)" class="figcaption--small">
              {{ standardOfferText(item.title) }}
            </div>
          </div>
          <app-badge v-if="item.sale" :theme="item.sale.color" size="lg-dt" class="badge">
            <img :src="item.sale.icon_path" class="badge__icon" alt="item.sale.icon_path" />
            <span class="badge__text">{{ item.sale.text }}</span>
          </app-badge>
        </div>
        <div class="price">
          {{ getPriceWithSign(item) }}
          <span v-if="isOldPriceExist(item)" class="price__old">{{ getOldPriceWithSign(item) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBadge from '@/components/shared/AppBadge.vue';
import { PRODUCT_SIZE } from '~/constants';

export default {
  name: 'AppOffers',

  components: { AppBadge },

  props: {
    offers: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      selectedOffer: this.getSelectedOffer()
    };
  },

  computed: {
    sizeQueryParam() {
      return this.$route.query.size?.toLowerCase()?.split('%20')?.join(' ');
    },

    hasSizeQueryParam() {
      return PRODUCT_SIZE.regular.includes(this.sizeQueryParam);
    }
  },

  methods: {
    getSelectedOffer() {
      if (!this.hasSizeQueryParam) {
        return 0;
      }

      const prepareSizeParam = (param = '') => param.toLowerCase()[0];
      const idx = this.offers.findIndex(
        (offer) => prepareSizeParam(offer.title) === prepareSizeParam(this.sizeQueryParam)
      );
      return idx === -1 ? 0 : idx;
    },

    onChange(item, idx) {
      this.selectedOffer = idx;
      this.$emit('setOffer', item);
    },

    isStandard(title) {
      return title === 'Standard';
    },

    standardOfferText() {
      return this.isStandard && '(Оn the picture)';
    },

    isOldPriceExist(item) {
      return Boolean(item.old_price);
    },

    getPriceWithSign(item) {
      return `£${item.price}`;
    },

    getOldPriceWithSign(item) {
      return `£${item.old_price}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.offers {
  @include gt-sm {
    margin: 12px 0 24px;
  }

  @include lt-md {
    margin: 9px 0 24px;
  }

  &__item {
    width: 100%;
    margin: 6px 0;
  }
}

.button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  box-sizing: border-box;
  transition: border 0.2s ease-out 0s;
  cursor: pointer;
  user-select: none;

  @include gt-sm {
    padding: 9px 18px;

    &:hover {
      border: 1px solid $color-green;

      .radio {
        border: 1px solid $color-green;

        &__shape {
          opacity: 1;
        }
      }
    }
  }

  @include lt-md {
    padding: 11px 16px;
  }

  &.active {
    border: 1px solid $color-green;

    .radio {
      border: 1px solid $color-green;

      &__shape {
        opacity: 1;
      }
    }
  }
}

.figure {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.figcaption {
  flex: 1;

  font-family: $golos-regular;
  font-size: 16px;
  line-height: 24px;
  margin: 0 12px 0 14px;

  @include gt-sm {
    display: flex;
    align-items: center;
  }

  &--small {
    font-size: 12px;
    line-height: normal;

    @include gt-sm {
      margin-left: 12px;
    }
  }
}

.radio {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  transition: border 0.2s ease-out 0s;

  &__shape {
    width: 10px;
    height: 10px;
    background: $color-green;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s ease-out 0s;
  }
}

.price {
  font-size: 16px;
  line-height: 24px;
  color: $color-dark-grey;

  @include gt-sm {
    font-family: $golos-medium;
  }

  @include lt-md {
    font-family: $golos-regular;
  }

  &__old {
    position: relative;
    display: inline-block;
    font-size: 14px;
    color: $color-white-grey;
    margin: 0 0 0 5px;

    &:before {
      content: '';
      display: block;
      height: 1px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      transform: rotate(-10deg);
      background: #db1838;
    }
  }
}

.badge {
  &__icon {
    display: block;

    @include gt-sm {
      width: 15px;
      margin-right: 4px;
    }

    @include lt-md {
      width: 13px;
      margin: 2px 0;
    }
  }

  &__text {
    @include lt-md {
      display: none;
    }
  }
}
</style>
