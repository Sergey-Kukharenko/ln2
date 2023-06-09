<template>
  <div class="list" :style="getStyle">
    <div v-for="(item, idx) in list" :key="idx" class="list__item">
      <span class="text" @click="add(item)">{{ item.title }}</span>
      <svg-icon v-if="hasRemoveBtn" name="close" class="button" @click="remove(item)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppList',

  props: {
    list: {
      type: Array,
      default: () => []
    },

    hasRemoveBtn: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    itemsCountInColumn() {
      return Math.ceil(this.list.length / 2);
    },

    getStyle() {
      return {
        'grid-template-rows': `repeat(${this.itemsCountInColumn}, auto)`
      };
    }
  },

  methods: {
    add(item) {
      this.$emit('addItem', item);
    },

    remove(item) {
      this.$emit('removeItem', item);
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  @include gt-sm {
    display: grid;
    grid-template-rows: repeat(5, auto);
    grid-auto-columns: auto;
    grid-auto-flow: column;
  }

  @include lt-md {
    margin-top: 8px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: $golos-regular;
    font-size: 16px;
    line-height: 24px;
    color: $color-dark-grey;
    user-select: none;
    cursor: pointer;

    @include gt-sm {
      padding: 4px 8px;

      &:hover {
        background: $bg-grey;
        border-radius: 10px;
      }
    }

    @include lt-md {
      padding: 4px 0;
    }
  }
}

.button {
  width: 16px;
  height: 16px;
  margin-left: 10px;

  @include gt-sm {
    opacity: 0;
    padding: 4px;
    transform: scale(0.8);
    transition: opacity 0.2s ease-out 0s, transform 0.2s ease-out 0s;

    &:hover {
      opacity: 1;
      transform: scale(1);
    }
  }

  @include lt-md {
    padding: 6px;
    background: $bg-grey;
    border-radius: 50%;
  }
}

.text {
  flex: 1;
}
</style>
