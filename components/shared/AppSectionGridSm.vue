<template>
  <div :class="classNames">
    <div v-for="(slide, idx) in slides" :key="idx" class="grid__item">
      <slot v-bind="{ ...slide }"></slot>
    </div>
  </div>
</template>

<script>
import { useClassNameProp } from '~/helpers';
export default {
  name: 'AppSectionGridSm',

  props: {
    slides: {
      type: Array,
      default: () => []
    },

    theme: {
      type: String,
      default: ''
    }
  },

  computed: {
    classNames() {
      return useClassNameProp(this.theme, 'grid');
    }
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-wrap: wrap;

  @include gt-sm {
    margin: -11px;
  }

  @include lt-md {
    margin: -6px -3px;
  }

  &__item {
    @include gt-sm {
      width: calc(20% - 22px);
      margin: 11px;
    }

    @include lt-md {
      width: calc(33.3333% - 6px);
      margin: 6px 3px;
    }

    &:nth-child(1),
    &:nth-child(2) {
      @include lt-md {
        width: calc(50% - 6px);
      }
    }
  }

  &--custom {
    .grid__item {
      @include gt-sm {
        width: calc(16.6667% - 22px);
      }

      &:nth-child(1),
      &:nth-child(2) {
        @include lt-md {
          width: calc(33.3333% - 6px);
        }
      }
    }

    .card__title {
      margin-top: 8px;
    }
  }
}
</style>
