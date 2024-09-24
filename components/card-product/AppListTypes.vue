<template>
  <div class="list-types">
    <div v-for="(item, idx) in mappedList" :key="idx" class="list-types__item" @click="onChange(item, idx)">
      <div class="card" :class="[{ recommended: item.is_recommended }, { active: idx === selectedItemIndex }]">
        <div class="figcaption" :class="item.type">{{ item.title }}</div>
        <svg-icon :name="item.icon" class="card__icon" :class="item.type" />

        <div v-if="item.is_recommended" class="bookmark">
          <svg-icon name="bookmark" class="bookmark__icon" />
          <div class="bookmark__text">Best choice</div>
        </div>

        <!--Временно скрыт-->
        <!--<div v-if="item.is_recommended" class="badge">-->
        <!--  <img src="/icons/fire.png" alt="fire" class="badge__icon" />-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { CONSTRUCTOR_HEIGHT_COOKIE } from '~/constants';

const HEIGHT_TYPE_MAP = {
  0: {
    icon: 'short-bouquet',
    type: 'short'
  },
  1: {
    icon: 'long-bouquet',
    type: 'long'
  }
};

export default {
  name: 'AppListTypes',

  props: {
    list: {
      type: Array,
      default: () => []
    },

    hasSizeQueryParam: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      selectedItemIndex: this.getSelectedItemIndex()
    };
  },

  computed: {
    mappedList() {
      return this.list.map((el, idx) => ({
        ...el,
        ...HEIGHT_TYPE_MAP[idx]
      }));
    }
  },

  methods: {
    getSelectedItemIndex() {
      const targetValue = this.hasSizeQueryParam
        ? this.$route.query.size
        : this.$cookies.get(CONSTRUCTOR_HEIGHT_COOKIE);
      const idx = this.list.findIndex((c) => c.id === targetValue);
      return idx !== -1 ? idx : 0;
    },

    onChange(item, idx) {
      this.selectedItemIndex = idx;
      this.$emit('setItem', item);
    }
  }
};
</script>

<style scoped lang="scss">
.list-types {
  max-width: 442px;
  display: flex;
  user-select: none;

  @include gt-sm {
    margin: 8px -4px;
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
    width: calc(50% - 8px);
    margin: 4px 4px;

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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  border-radius: 12px;

  @include gt-sm {
    cursor: pointer;
    padding: 8px 32px 8px 16px;
  }

  @include lt-md {
    padding: 4px 16px;
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

  &:before,
  &:after {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #eaeaea;
  }

  &:after {
    border: 2.5px solid $color-green;
    opacity: 0;
  }

  &:hover {
    .figcaption {
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
    .figcaption {
      color: $color-dark-grey;
    }

    &:before {
      opacity: 0;
    }

    &:after {
      opacity: 1;
    }
  }

  &__icon {
    flex-shrink: 0;

    &.short {
      @include gt-sm {
        width: 38px;
        height: 28px;
      }

      @include lt-md {
        width: 33px;
        height: 24px;
      }
    }

    &.long {
      @include gt-sm {
        width: 34.336px;
        height: 47.796px;
      }

      @include lt-md {
        width: 28.613px;
        height: 39.83px;
      }
    }
  }

  &.recommended {
    @include gt-sm {
      padding: 8px 8px 8px 16px;
    }

    @include lt-md {
      padding: 4px 6px 4px 16px;
    }
  }
}

.figcaption {
  font-family: $golos-regular;
  color: $color-white-grey;
  max-width: 77px;
  margin-right: auto;

  @include gt-sm {
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.01em;
  }

  @include lt-md {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.24px;
  }
}

.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #ffeec6;
  border-radius: 50%;
  margin-left: 4px;

  &__icon {
    display: block;
    width: 14px;
  }
}

.bookmark {
  flex-shrink: 0;
  position: relative;
  z-index: 2;

  @include gt-sm {
    margin: -18px 0 0 8px;
  }

  @include lt-md {
    margin: -12px 0 0 4px;
  }

  &__icon {
    position: relative;
    z-index: 1;

    @include gt-sm {
      width: 34px;
      height: 47px;
    }

    @include lt-md {
      width: 28px;
      height: 38px;
    }
  }

  &__text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-family: $golos-regular;
    color: #fff;
    text-align: center;

    padding: 8px 0;
    z-index: 2;

    @include gt-sm {
      font-size: 9px;
      line-height: 9px;
      letter-spacing: -0.09px;
    }

    @include lt-md {
      font-size: 8px;
      line-height: 8px;
      letter-spacing: -0.08px;
    }
  }
}
</style>
