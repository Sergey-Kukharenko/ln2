<template>
  <div :class="classNames">
    <div class="item__question" @click="isVisible = !isVisible">
      <div class="item__question-text">{{ item.question }}</div>
      <svg-icon class="item__question-icon" name="arrow-down" />
    </div>
    <div class="item__answer">
      {{ item.answer }}
    </div>
  </div>
</template>

<script>
import { useToggleClassName } from '@/helpers';

export default {
  name: 'AppSeoFaqListItem',

  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      isVisible: true
    };
  },

  computed: {
    classNames() {
      return useToggleClassName(this.isVisible, 'item', 'active');
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  padding: 16px 0;

  &:not(:last-child) {
    @include lt-md {
      border-bottom: 1px solid #eaeaea;
    }
  }

  &__question {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
  }

  &__question-text {
    font-family: $golos-bold;
    letter-spacing: 0.01em;
    color: $color-dark-grey;

    @include gt-sm {
      font-size: 24px;
      line-height: 28px;
    }

    @include lt-md {
      font-size: 14px;
      line-height: 20px;
    }
  }

  &__question-icon {
    flex-shrink: 0;
    margin: 2px 0 0 8px;
    transition: 0.075s ease 0s;

    @include gt-sm {
      width: 24px;
      height: 24px;
    }

    @include lt-md {
      width: 16px;
      height: 16px;
    }
  }

  &__answer {
    display: none;
    font-family: $golos-regular;
    color: $color-dark-grey;

    @include gt-sm {
      font-size: 16px;
      line-height: 24px;
      margin-top: 16px;
    }

    @include lt-md {
      font-size: 11px;
      line-height: 16px;
      margin-top: 14px;
    }
  }

  &--active {
    & .item__question-icon {
      transform: rotate(-180deg);
    }

    & .item__answer {
      display: block;
    }
  }
}
</style>
