<template>
  <svg-icon name="heart" :class="classNames" v-on="$listeners" />
</template>

<script>
export default {
  name: 'AppLikeIcon',

  props: {
    like: {
      type: Boolean,
      default: false
    },

    theme: {
      type: String,
      default: 'color',
      validate(value) {
        ['outline', 'color', 'grey'].includes(value);
      }
    },

    size: {
      type: String,
      default: '',
      validate(value) {
        return ['small', 'not-change'].includes(value);
      }
    }
  },

  computed: {
    classNames() {
      return {
        [`icon--theme-${this.theme}`]: this.theme,
        [`icon--size-${this.size}`]: this.size,
        'icon--active': this.like
      };
    }
  }
};
</script>

<style scoped lang="scss">
.icon {
  display: block;
  mix-blend-mode: normal;
  fill: currentColor;
  color: #fff;
  stroke: $color-white-grey;
  cursor: pointer;

  @include gt-sm {
    width: 20px;
    height: 18.5px;
  }

  @include lt-md {
    width: 13.33px;
    height: 12.33px;
  }

  &--theme-outline {
    color: transparent;

    &.icon {
      &--active {
        color: $color-like-active;
        stroke: #fff;
      }
    }
  }

  &--theme-color {
    &.icon {
      &--active {
        color: $color-like-active;
        stroke: #fff;
      }
    }
  }

  &--theme-grey {
    color: transparent;

    &.icon {
      &--active {
        color: $color-grey;
        stroke: $color-grey;
      }
    }
  }

  &--size-small {
    @include gt-sm {
      width: 16.67px;
      height: 15.42px;
    }

    @include lt-md {
      width: 13.33px;
      height: 12.33px;
    }
  }

  &--size-not-change {
    width: 20px;
    height: 18.5px;
  }
}
</style>
