<template>
  <div class="profile-sidebar-nav">
    <div
      v-for="item of list"
      :key="item.label"
      class="item"
      :class="{ active: item.to === $route.path }"
      @click="onMoveToPage(item.to)"
    >
      <svg-icon :name="item.icon" class="item-icon" />

      <div class="content">
        <div class="label">{{ item.label }}</div>

        <div class="container">
          <div v-if="item.count" class="count">{{ item.count }}</div>
          <svg-icon v-if="$device.isMobile" name="profile-arrow" class="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import profileMoveToPage from '~/mixins/profile-move-to-page.vue';

export default Vue.extend({
  name: 'ProfileSidebarNav',

  mixins: [profileMoveToPage],

  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
});
</script>

<style scoped lang="scss">
.item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: $color-dark-grey;
  cursor: pointer;

  @include gt-sm {
    &:hover,
    &.active {
      color: $color-dark-green;
    }
  }
}

.icon,
.count {
  flex-shrink: 0;
}

.item-icon {
  width: 24px;
  height: 24px;
  fill: currentColor;

  @include lt-md {
    color: $color-dark-green;
  }
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #cccccc;

  @include gt-sm {
    padding: 16px 0 15px 0;
  }

  @include lt-md {
    padding: 18px 0 17px 0;
  }
}

.label {
  flex: 1;
  font-family: $golos-regular;

  @include gt-sm {
    font-size: 16px;
    line-height: 24px;
  }

  @include lt-md {
    font-size: 14px;
    line-height: 20px;
  }
}

.container {
  display: flex;
  align-items: center;
  gap: 18px;
}

.arrow {
  width: 6px;
  height: 14px;
  color: #ccc;
}

.count {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-family: $sf-pro-medium;
  font-size: 14px;
  color: $color-dark-grey;
  border-radius: 50%;

  @include gt-sm {
    background: #eaeaea;
  }

  @include lt-md {
    background: #fff;
  }
}
</style>
