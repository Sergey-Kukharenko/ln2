<template>
  <div class="profile-aside-order-row" :class="classes">
    <div class="label">
      {{ item.label }}
    </div>
    <div class="value">
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

    applyToAll: {
      type: Boolean,
      default: false
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
        [`apply-to-all`]: this.applyToAll,
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

  &.size-medium {
    & .value {
      font-family: $golos-medium;
      font-size: 14px;
    }
  }

  &.size-large {
    & .value {
      font-family: $golos-bold;
      font-size: 16px;
    }
  }

  &.color-black {
    & .value {
      color: $color-dark-grey;
    }
  }

  &.color-green {
    & .value {
      color: $color-dark-green;
    }
  }

  &.apply-to-all {
    &.color-black {
      & .label {
        color: $color-dark-grey;
      }
    }

    &.size-large {
      & .label {
        font-family: $golos-bold;
        font-size: 16px;
      }
    }
  }
}

.label {
  font-family: $golos-regular;
  font-size: 14px;
  letter-spacing: -0.01em;
  color: $color-white-grey;
}
</style>
