<template>
  <div class="list-numbers">
    <div v-for="(item, key, idx) in list" :key="idx" class="list-numbers__item" @click="onChange(key, idx)">
      <div class="card" :class="{ active: idx === selectedItem }">
        <div class="number">
          <span>{{ key }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppListNumbers',

  props: {
    list: {
      type: Object,
      default: () => ({})
    },

    activeNumber: {
      type: [Number, String],
      default: 0
    }
  },

  data() {
    return {
      selectedItem: 0
    };
  },

  mounted() {
    const idx = Object.keys(this.list).indexOf(this.activeNumber.toString());
    this.selectedItem = idx !== -1 ? idx : 0;
  },

  methods: {
    onChange(key, idx) {
      this.selectedItem = idx;
      this.$emit('setNumber', key);
    }
  }
};
</script>

<style scoped lang="scss">
.list-numbers {
  display: flex;
  user-select: none;

  @include gt-sm {
    margin: 0 8px;
  }

  @include lt-md {
    margin: 4px 0;
  }

  @include lt-sm {
    padding: 3px 0 0 0;
    overflow: hidden;
    overflow-x: auto;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__item {
    margin: 4px 2px;

    @include lt-md {
      flex: 1;
      &:first-child {
        margin-left: 14px;
      }

      &:last-child {
        margin-right: 14px;
      }
    }
  }
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  position: relative;
  z-index: 1;
  border-radius: 12px;

  @include gt-sm {
    cursor: pointer;
    min-height: 36px;
  }

  @include lt-md {
    min-height: 32px;
  }

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    z-index: 2;
    border-radius: 10px;
    transition: opacity 0.3s ease 0s;
  }

  &:before {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #eaeaea;
  }

  &:after {
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 2.5px solid $color-green;
    opacity: 0;
  }

  &:hover {
    .number {
      color: $color-dark-grey;
    }

    &:before {
      @include gt-sm {
        opacity: 0;
      }
    }

    &:after {
      @include gt-sm {
        opacity: 1;
      }
    }
  }

  &.active {
    .number {
      color: $color-dark-grey;
    }

    &:before {
      opacity: 0;
    }

    &:after {
      opacity: 1;
    }
  }
}

.number {
  font-family: $golos-regular;
  color: $color-white-grey;
  text-align: center;
  white-space: nowrap;

  @include gt-sm {
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.01em;
  }

  @include lt-md {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.02em;
  }
}
</style>
