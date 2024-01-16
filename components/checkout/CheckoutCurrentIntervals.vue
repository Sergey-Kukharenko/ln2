<template>
  <div class="checkout-current-intervals">
    <div v-for="(item, index) in list" :key="index" class="time-interval" @click="$emit('set-time-interval', item)">
      <div class="time-interval__label">
        <app-radio v-model="passedTime" :name="item.label" />
        {{ item.label }}
      </div>
      <div class="time-interval__delivery-amount">
        {{ showDeliveryPrice(item) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutCurrentIntervals',
  components: { AppRadio: () => import('~/components/shared/AppRadio.vue') },

  props: {
    list: {
      type: Array,
      default: () => []
    },

    time: {
      type: String,
      default: ''
    }
  },

  computed: {
    passedTime: {
      get() {
        return this.time;
      },

      set(newTime) {
        this.$emit('update:time', newTime);
      }
    }
  },

  methods: {
    showDeliveryPrice(item) {
      const price = item.delivery_amount;

      if (!price) {
        return 'Free delivery';
      }

      return `£ ${price}`;
    }
  }
};
</script>

<style scoped lang="scss">
.time-interval {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eaeaea;

  @include gt-sm {
    cursor: pointer;
  }

  &:last-child {
    border-bottom: 0 none;
    padding-bottom: 0;
  }

  &__label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: $golos-regular;
    color: $color-dark-grey;

    @include gt-md {
      font-size: 14px;
      line-height: 20px;
    }

    @include lt-lg {
      font-size: 12px;
      line-height: 14px;
      letter-spacing: -0.01em;
    }
  }

  &__delivery-amount {
    font-family: $golos-medium;
    color: $color-dark-grey;

    @include gt-md {
      font-size: 14px;
      line-height: 20px;
    }

    @include lt-lg {
      font-size: 12px;
      line-height: 14px;
      letter-spacing: -0.01em;
    }
  }
}
</style>
