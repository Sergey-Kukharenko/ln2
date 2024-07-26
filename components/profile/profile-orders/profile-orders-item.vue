<template>
  <div class="profile-orders-item" :class="classes">
    <div class="figure">
      <img :src="item.img" :alt="item.title" />
      <app-counter v-if="item.count" :count="item.count" theme="flat" class="counter" />
      <svg-icon v-if="$device.isMobile && !item.date" name="profile-collected" class="collected-icon" />
    </div>
    <div class="content" :class="{ grey: item.date }">
      Order <span :class="{ 'color-green': !item.date }">{{ item.orderNumber }}</span> <span>{{ item.status }}</span>
      <span v-if="item.date">{{ item.date }}</span>
    </div>
    <div v-if="$device.isDesktopOrTablet && item.date" class="button">
      <svg-icon name="profile-basket" class="basket-icon" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import AppCounter from '~/components/shared/AppCounter.vue';

export default Vue.extend({
  name: 'ProfileOrdersItem',
  components: { AppCounter },

  props: {
    item: {
      type: Object,
      default: () => ({})
    },

    background: {
      type: String,
      default: 'grey',
      validate(value) {
        return ['grey', 'white'].includes(value);
      }
    }
  },

  computed: {
    classes() {
      return {
        [`background-${this.background}`]: this.background
      };
    }
  }
});
</script>

<style scoped lang="scss">
.profile-orders-item {
  display: flex;
  align-items: center;
  background: $bg-grey;

  @include gt-sm {
    gap: 12px;
    padding: 12px 16px;
    border-radius: 12px;
  }

  @include lt-md {
    gap: 16px;
    padding: 14px 12px;
    border-radius: 16px;
  }
}

.background-grey {
  background: $bg-grey;
}

.background-white {
  background: white;
}

.figure {
  flex-shrink: 0;
  position: relative;

  @include gt-sm {
    width: 48px;
    height: 48px;
  }

  @include lt-md {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }
}

img {
  display: block;
  width: 100%;
  border-radius: 16px;
}

.counter {
  bottom: -4px;
  right: -4px;
  background: $color-green;
}

.content {
  font-family: $golos-medium;
  color: $color-dark-grey;

  @include gt-sm {
    font-size: 16px;
    line-height: 20px;
  }

  @include lt-md {
    font-size: 14px;
    line-height: 18.2px;
    letter-spacing: -0.01em;
    max-width: 170px;
  }

  &.grey {
    color: #7c7c7c;
  }
}

.color-green {
  color: $color-dark-green;
}

.button {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: auto;
}

.basket-icon {
  width: 100%;
  height: 100%;
  color: #cccccc;

  &:hover {
    color: $color-like-active;
  }
}

.collected-icon {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 0;
  right: -2px;
}
</style>
