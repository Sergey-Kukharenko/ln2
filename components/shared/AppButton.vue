<template>
  <button :class="classNames" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
import { useClassName } from '@/helpers';

export default {
  name: 'AppButton',

  props: {
    theme: {
      type: String,
      default: '',
      validate(value) {
        return ['grey', 'green-whitely', 'grey-whitely', 'yellow', 'yellow-whitely'].includes(value);
      }
    },

    size: {
      type: String,
      default: '',
      validate(value) {
        return ['xs', 'sm', 'md', 'pre-lg', 'lg'].includes(value);
      }
    },

    stretch: {
      type: String,
      default: '',
      validate(value) {
        return ['fix', 'full', 'search'].includes(value);
      }
    }
  },

  computed: {
    classNames() {
      return useClassName(this.$props, 'button');
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  font-family: $golos-medium;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  background: $color-green;
  border-radius: 12px;
  padding: 0 12px;
  transition: background-color 0.2s ease 0s;

  @include gt-sm {
    &:hover:not(:disabled) {
      box-shadow: 2px 4px 7px darken($color-green, 10%);
      cursor: pointer;
    }

    &:active:not(:disabled) {
      box-shadow: 0 0 0 $color-green;
    }
  }

  &:disabled {
    background: #ccc;
    cursor: none;
  }

  &--rounded {
    border-radius: 18px;
  }

  &--grey {
    color: #000;
    background: #eaeaea;

    @include gt-sm {
      &:hover:not(:disabled) {
        background: #eaeaea;
        box-shadow: 2px 4px 7px darken(#eaeaea, 10%);
        cursor: pointer;
      }

      &:active:not(:disabled) {
        box-shadow: 0 0 0 #eaeaea;
      }
    }
  }

  &--yellow {
    color: #000000;
    background: #ffcd1e;

    @include gt-sm {
      &:hover:not(:disabled) {
        background: #ffcd1e;
        box-shadow: 2px 4px 7px darken(#ffcd1e, 10%);
        cursor: pointer;
      }

      &:active:not(:disabled) {
        box-shadow: 0 0 0 $bg-grey;
      }
    }
  }

  &--yellow-whitely {
    color: #fff;
    background: #ffc33d;

    @include gt-sm {
      border-radius: 12px;

      &:hover:not(:disabled) {
        background: #ffc33d;
        box-shadow: 2px 4px 7px #d9d9d9;
        cursor: pointer;
      }

      &:active:not(:disabled) {
        box-shadow: 0 0 0 $bg-grey;
      }
    }

    @include lt-md {
      border-radius: 6px;
    }
  }

  &--grey-whitely {
    font-family: $golos-medium;
    font-size: 16px;
    color: #000;
    min-height: 48px;
    background: $bg-grey;

    @include gt-sm {
      &:hover:not(:disabled) {
        background: $bg-grey;
        box-shadow: 2px 4px 7px darken($bg-grey, 10%);
        cursor: pointer;
      }

      &:active:not(:disabled) {
        box-shadow: 0 0 0 $bg-grey;
      }
    }
  }

  &--green-whitely {
    font-family: $golos-medium;
    font-size: 16px;
    color: $color-green;
    min-height: 48px;
    background: $bg-grey;

    @include gt-sm {
      &:hover:not(:disabled) {
        background: $bg-grey;
        box-shadow: 2px 4px 7px darken($bg-grey, 10%);
        cursor: pointer;
      }

      &:active:not(:disabled) {
        box-shadow: 0 0 0 $bg-grey;
      }
    }
  }

  &--green-white {
    font-family: $golos-medium;
    font-size: 16px;
    color: $color-green;
    min-height: 48px;
    background: #ffffff;

    @include gt-sm {
      &:hover:not(:disabled) {
        background: $bg-grey;
        box-shadow: 2px 4px 7px darken($bg-grey, 10%);
        cursor: pointer;
      }

      &:active:not(:disabled) {
        box-shadow: 0 0 0 $bg-grey;
      }
    }
  }

  &--xs {
    font-family: $golos-medium;
    min-height: 36px;
    font-size: 12px;
    line-height: 16px;
    padding: 0 8px;

    &.button--fix {
      min-width: 87px;
    }
  }

  &--sm {
    font-family: $golos-medium;
    padding: 0;

    @include gt-sm {
      min-width: 36px;
      min-height: 36px;
      font-size: 14px;

      .card--sm & {
        width: 60px;
        font-size: 10px;
        line-height: 12px;

        min-height: 24px;
        border-radius: 6px;
      }
    }

    @include lt-md {
      min-height: 24px;
      font-size: 10px;
      line-height: 12px;
      border-radius: 6px;
    }

    &.button--fix {
      padding: 0;
      min-width: 60px;
    }
  }

  &--md {
    font-family: $golos-medium;

    @include gt-sm {
      font-size: 16px;
      padding: 0 30.52px;
    }

    @include lt-md {
      padding: 0 44.52px;
    }
  }

  &--pre-lg {
    @include gt-sm {
      font-size: 16px;
      padding: 12px 16px;
      min-height: 48px;
    }
  }

  &--lg {
    @include gt-sm {
      font-size: 16px;
      padding: 14px 16px;
      min-height: 50px;
    }

    @include lt-md {
      display: flex;
      min-width: 32px;
      min-height: 32px;
      padding: 2px;
      border-radius: 8px;
      box-sizing: border-box;
    }

    & ::v-deep(svg) {
      @include gt-sm {
        display: none;
      }

      @include lt-md {
        display: block;
        margin: auto;
      }
    }

    & ::v-deep(svg + span) {
      @include gt-sm {
        display: block;
      }

      @include lt-md {
        display: none;
      }
    }
  }

  &--x-lg {
    @include gt-sm {
      min-width: 180px;
      min-height: 54px;
      padding: 14px 16px;
      font-size: 16px;
    }

    @include lt-md {
      min-width: 100px;
      font-size: 12px;
      line-height: 14px;
      min-height: 34px;
      padding: 6px 0;
    }
  }

  &--fix {
    @include gt-sm {
      min-width: 244px;
    }

    @include lt-md {
      min-width: 236px;
    }
  }

  &--full {
    width: 100%;
  }

  &--search {
    min-width: 160px;
    border-radius: 12px;
    box-sizing: border-box;
  }
}
</style>
