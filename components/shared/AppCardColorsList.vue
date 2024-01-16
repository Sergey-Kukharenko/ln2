<template>
  <div class="colors-list">
    <div
      v-for="(item, idx) in list"
      :key="idx"
      class="colors-list__item"
      :class="{ active: idx === selectedColor }"
      @click="onChange(item, idx)"
    >
      <img :src="getImage(item.icon)" :alt="item.title" class="colors-list__item-image" />
      <svg-icon name="check" class="colors-list__item-icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCardColorsList',

  props: {
    list: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      selectedColor: 0
    };
  },

  mounted() {
    this.initializeColor();
  },

  methods: {
    onChange(item, idx) {
      this.selectedColor = idx;
      this.$emit('set-color-item', { item });
    },

    getImage(path) {
      return `${process.env.baseUrl}/${path}`;
    },

    initializeColor() {
      const idx = this.list.findIndex((el) => el.is_default);

      if (!idx !== -1) {
        this.onChange(this.list?.[idx], idx);

        return;
      }

      this.onChange(this.list?.[0], 0);
    }
  }
};
</script>

<style scoped lang="scss">
.colors-list {
  display: flex;
  align-items: center;

  @include gt-sm {
    padding: 10px 12px 8px;
    margin: 0 -2px;
  }

  @include lt-md {
    padding: 8px 8px 0px;
    margin: 0 -1px;
  }

  &__item {
    position: relative;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;

    @include gt-sm {
      width: 28px;
      height: 28px;
      margin: 0 2px;
    }

    @include lt-md {
      width: 16px;
      height: 16px;
      margin: 0 1px;
    }

    &.active {
      .colors-list__item-icon {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  &__item-image {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }

  &__item-icon {
    display: block;
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    opacity: 0;
    transform: scale(1.3);
    transition: opacity 0.2s ease-out, transform 0.2s ease-out;

    @include gt-sm {
      width: 16px;
      height: 16px;
    }

    @include lt-md {
      width: 8px;
      height: 8px;
    }
  }
}
</style>
