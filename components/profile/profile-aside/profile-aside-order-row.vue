<template>
  <div class="profile-aside-order-row">
    <div class="label">
      {{ item.label }}
    </div>
    <div class="value" :class="classes">
      {{ item.value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileAsideOrderRow',

  props: {
    item: {
      type: Object,
      default: () => ({})
    },

    size: {
      type: String,
      default: 'medium',
      validate(value) {
        return ['medium', 'large'].includes(value);
      }
    },

    color: {
      type: String,
      default: 'black',
      validate(value) {
        return ['black', 'green'].includes(value);
      }
    }
  },

  computed: {
    classes() {
      return {
        [`size-${this.size}`]: this.size,
        [`color-${this.color}`]: this.color
      };
    }
  }
};
</script>

<style scoped lang="scss">
.profile-aside-order-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 20px;
}

.label {
  font-family: $golos-regular;
  font-size: 14px;
  letter-spacing: -0.01em;
  color: $color-white-grey;
}

.value {
  &.size-medium {
    font-family: $golos-medium;
    font-size: 14px;
  }

  &.size-large {
    font-family: $golos-bold;
    font-size: 16px;
  }

  &.color-black {
    color: $color-dark-grey;
  }

  &.color-green {
    color: $color-dark-green;
  }
}
</style>
