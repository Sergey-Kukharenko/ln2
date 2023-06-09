<template>
  <div class="detail">
    <div class="detail__panel panel">
      <div class="detail__title">Order details</div>
      <div v-if="orderItems.length" class="panel__items items">
        <div class="items__top">
          <div class="items__top-column" @click="toggleItems">
            {{ itemsCount }} <svg-icon name="arrow-grey" class="items__icon" />
          </div>
          <div class="items__top-column items__price">£ {{ orderCost.positionsCost }}</div>
        </div>
        <div class="items__body goods" :class="{ active: itemsVisibility }">
          <div v-for="(item, idx) in orderItems" :key="idx" class="goods__item">
            <div class="goods__item-picture">
              <img
                :src="useSizedImage({ name: item.image.filename })"
                class="goods__item-picture--img"
                :alt="item.image.alt_text"
              />
            </div>
            <div class="goods__item-title">
              {{ item.offer_title }}
              <small>{{ useGetPositionSizeText(item.title, item.is_bouquet) }}</small>
            </div>
          </div>
        </div>
      </div>
      <div class="panel__discount">
        <div v-if="orderCost.sale" class="panel__discount-item">
          Discount <span class="sale">- £ {{ orderCost.sale }}</span>
        </div>
        <div class="panel__discount-item">
          Delivery <span class="delivery">{{ orderCost.deliveryAmount }}</span>
        </div>
      </div>
      <div class="panel__total">
        <div class="panel__total-item total">
          Total <span class="total__price">£ {{ orderCost.totalSum }}</span>
        </div>
        <div v-if="orderCost.cashback" class="panel__total-item cashback">
          Cashback
          <span class="cashback__price">
            <svg-icon class="cashback__icon" name="coins" />
            £ {{ orderCost.cashback }}
          </span>
        </div>
      </div>
      <!-- <div class="panel__bottom"> -->
      <!-- <a href="#" class="panel__bottom-link" @click="cancelOrder">Cancel the order</a> -->
      <!-- </div> -->
    </div>
    <div class="detail__info">
      <div class="detail__info-content info">
        <div class="info__column">
          <svg-icon name="user-outline" class="info__icon" />
        </div>
        <div class="info__column">You can track the order status in your personal account</div>
      </div>
      <app-button theme="grey-whitely" stretch="full">Soon</app-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AppButton from '@/components/shared/AppButton';
import OrderCancel from '@/components/OrderCancel';

import { useSizedImage, useGetPositionSizeText } from '~/helpers';

export default {
  name: 'OrderDetail',

  components: {
    AppButton
  },

  data() {
    return {
      itemsVisibility: false
    };
  },

  computed: {
    ...mapGetters({
      orderPositionsCount: 'order/getCount',
      getOrder: 'order/getOrder',
      orderItems: 'order/orderSplittedPositions'
    }),

    itemsCount() {
      return this.orderPositionsCount > 1 ? `${this.orderPositionsCount} items` : `${this.orderPositionsCount} item`;
    },

    orderCost() {
      return {
        positionsCost: this.getOrder?.positions_cost ?? 0,
        deliveryAmount: +this.getOrder?.delivery_amount ? `£ ${this.getOrder?.delivery_amount}` : 'Free',
        totalSum: this.getOrder?.total_cost ?? 0,
        cashback: +this.getOrder?.cashback ?? 0,
        sale: +this.getOrder?.promo_code?.discount ? this.getOrder?.promo_code?.discount : 0
      };
    }
  },

  methods: {
    useSizedImage,
    useGetPositionSizeText,

    toggleItems() {
      this.itemsVisibility = !this.itemsVisibility;
    },

    cancelOrder() {
      this.$emit('cancel', OrderCancel.name);
    }
  }
};
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  gap: 24px;

  box-sizing: border-box;
  width: 344px;
  flex-shrink: 0;
  margin-top: 64px;

  @include lt-lg {
    width: 100%;
  }

  @include lt-md {
    display: none;
  }

  & > * {
    padding: 24px;
    border: 1.5px solid #dde0e6;
    border-radius: 12px;
    height: fit-content;
  }

  &__title {
    font-family: $golos-medium;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #000000;

    margin-bottom: 23px;

    @include lt-md {
      font-style: normal;
      font-size: 16px;
      line-height: 20px;
      color: $color-dark-grey;
    }
  }

  .panel {
    &__items,
    &__discount,
    &__total {
      font-family: $golos-regular;
      font-style: normal;
      font-size: 14px;
    }

    &__discount {
      display: flex;
      flex-direction: column;
      gap: 8px;

      font-weight: 400;
      letter-spacing: -0.01em;
      color: #7c7c7c;

      padding-bottom: 16px;
      margin-bottom: 16px;

      border-bottom: 1px solid #eaeaea;

      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .sale {
        font-weight: 500;
        font-family: $golos-medium;
        color: $color-dark-green;
      }
    }

    &__total {
      display: flex;
      flex-direction: column;
      gap: 10px;

      font-weight: 400;
      letter-spacing: -0.01em;
      color: #7c7c7c;

      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .total {
        color: $color-dark-grey;

        &__price {
          font-weight: 500;
          font-family: $golos-bold;
          color: $color-dark-grey;
        }
      }

      .cashback {
        &__price {
          display: flex;
          align-items: center;
          gap: 6.42px;

          font-weight: 500;
          font-family: $golos-bold;
          color: #f8b900;
        }

        &__icon {
          width: 15.58px;
          height: 14px;
        }
      }
    }

    &__bottom {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      margin-top: 24px;

      &-link {
        font-family: $golos-regular;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #db1838;
      }
    }

    .items {
      font-weight: 400;
      letter-spacing: -0.01em;
      color: #7c7c7c;

      padding-bottom: 8px;

      &__top {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &-column {
          display: flex;
          align-items: center;
        }
      }

      &__price {
        font-weight: 500;
        font-family: $golos-medium;
        color: $color-dark-grey;
      }

      &__icon {
        display: block;
        width: 14px;
        height: 14px;
        cursor: pointer;
        margin-left: 8px;
      }

      .goods {
        display: none;
        flex-direction: column;
        gap: 8px;

        padding-top: 8px;

        &.active {
          display: flex;
        }

        &__item {
          display: flex;
          align-items: center;
          gap: 8px;

          &-picture {
            width: 48px;
            height: 48px;

            &--img {
              width: 100%;
              height: 100%;
              border-radius: 12px;
            }
          }

          &-title {
            font-family: $golos-regular;
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: -0.01em;
            color: $color-dark-grey;

            max-width: 200px;

            small {
              display: block;
              color: $color-grey;
            }
          }
        }
      }
    }
  }

  .info {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 12px;

    font-family: $golos-regular;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #7c7c7c;

    &__icon {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
