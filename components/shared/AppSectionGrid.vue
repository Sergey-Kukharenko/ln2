<template>
  <div :class="classNames">
    <div v-for="(slide, idx) in slides" :key="idx" class="grid__item">
      <slot v-bind="{ ...slide }"></slot>
    </div>

    <div v-if="isCustomTheme" class="grid__item">
      <app-card-show-more :prefix="prefix" :slug="slug" :rest="restOfSlides" />
    </div>
  </div>
</template>

<script>
import AppCardShowMore from '~/components/shared/AppCardShowMore.vue';

export default {
  name: 'AppSectionGrid',

  components: { AppCardShowMore },

  props: {
    slides: {
      type: Array,
      default: () => []
    },

    theme: {
      type: String,
      default: '',
      validate(value) {
        return ['custom'].includes(value);
      }
    },

    stretch: {
      type: Boolean,
      default: false
    },

    slug: {
      type: String,
      default: ''
    },

    prefix: {
      type: String,
      default: ''
    },

    total: {
      type: [String, Number],
      default: 0
    }
  },

  computed: {
    classNames() {
      return {
        grid: true,
        [`grid--${this.theme}`]: this.theme,
        'grid--stretch': this.stretch
      };
    },

    isCustomTheme() {
      return this.theme === 'custom';
    },

    restOfSlides() {
      return this.total - this.slides.length;
    }
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  max-width: 1064px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @include gt-sm {
    grid-template-columns: repeat(auto-fill, minmax(22%, 1fr));
    grid-gap: 16px;
    row-gap: 40px;
  }

  @include lt-md {
    grid-template-columns: repeat(auto-fill, minmax(48%, 1fr));
    grid-gap: 8px;
    row-gap: 8px;
  }

  &--custom {
    .grid__item {
      @include lt-md {
        &:last-child {
          grid-column: span 2;
          margin-top: 8px;
        }
      }
    }
  }

  &--stretch {
    @include gt-sm {
      max-width: 100%;
      column-gap: 14px;
      row-gap: 32px;
    }

    @include lt-md {
      column-gap: 8px;
      row-gap: 16px;
    }
  }
}
</style>
