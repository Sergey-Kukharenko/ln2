<template>
  <div class="profile-slide-toggle">
    <div class="head" @click="visibility = !visibility">
      <div class="title">
        <svg-icon v-if="icon" class="icon-title" :name="icon" />
        {{ title }}
      </div>
      <svg-icon name="arrow-grey" class="icon-arrow" :class="{ active: visibility }" />
    </div>
    <div v-show="visibility" class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileSlideToggle',

  props: {
    icon: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: ''
    },

    isVisible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visibility: this.isVisible
    };
  }
};
</script>

<style scoped lang="scss">
.profile-slide-toggle {
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: $golos-medium;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: $color-dark-grey;

  @include gt-sm {
    font-size: 24px;
    line-height: 28px;
  }

  @include lt-md {
    font-size: 16px;
    line-height: 20px;
  }
}

.icon-title {
  width: 24px;
  height: 24px;
}

.icon-arrow {
  width: 14px;
  height: 14px;

  &.active {
    transform: rotate(-180deg);
  }
}

.content {
  padding: 8px 0;
}
</style>
