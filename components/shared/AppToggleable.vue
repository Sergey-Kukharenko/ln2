<template>
  <button class="toggleable" :class="{ active: item.isClicked }" :disabled="disabled" @click="toggle">
    <svg-icon :name="changeableIconName" />
    <span class="count">{{ item.count }}</span>
  </button>
</template>

<script>
export default {
  name: 'AppToggleable',

  props: {
    item: {
      type: Object,
      default: () => {}
    },

    iconName: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      currentItem: this.item
    };
  },

  computed: {
    changeableIconName() {
      return this.currentItem.isClicked ? `${this.iconName}--active` : this.iconName;
    }
  },

  methods: {
    toggleClick() {
      this.currentItem.isClicked = !this.currentItem.isClicked;
    },

    toggleCount() {
      this.currentItem.isClicked ? this.currentItem.count-- : this.currentItem.count++;
    },

    toggle() {
      this.toggleCount();
      this.toggleClick();
      this.$emit('setItem', this.currentItem);
    }
  }
};
</script>

<style scoped lang="scss">
.toggleable {
  display: flex;
  align-items: center;
  user-select: none;
}

.icon {
  margin-right: 4px;

  @include gt-sm {
    width: 24px;
    height: 24px;
  }

  @include lt-md {
    width: 16px;
    height: 16px;
  }
}

.count {
  font-family: $golos-regular;
  color: #cccccc;

  @include gt-sm {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
  }

  @include lt-md {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.02em;
  }
}
</style>
