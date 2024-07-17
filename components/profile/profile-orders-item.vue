<template>
  <div class="profile-orders-item">
    <div class="figure">
      <img :src="item.img" :alt="item.title" />
    </div>
    <div class="content">
      Order <span :class="{ 'color-green': !item.date }">{{ item.orderNumber }}</span> <span>{{ item.status }}</span>
    </div>
    <div v-if="$device.isDesktopOrTablet" class="button">
      <svg-icon name="profile-basket" class="icon" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'ProfileOrdersItem',

  props: {
    item: {
      type: Object,
      default: () => ({})
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

.figure {
  flex-shrink: 0;
  position: relative;
  overflow: hidden;

  @include gt-sm {
    width: 48px;
    height: 48px;
    border-radius: 16px;
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
}

.content {
  font-family: $golos-medium;

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

.icon {
  width: 100%;
  height: 100%;
  color: #cccccc;

  &:hover {
    color: $color-like-active;
  }
}
</style>
