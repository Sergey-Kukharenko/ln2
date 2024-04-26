<template>
  <div :class="classNames">
    <div class="section__title" @click="isVisible = !isVisible">
      {{ section.title }}
    </div>
    <div class="section__list list">
      <nuxt-link v-for="(item, idx) in section.list" :key="idx" :to="`/${item.url}`" class="list__item">
        {{ item.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { useToggleClassName } from '@/helpers';

export default {
  name: 'AppFooterSection',

  props: {
    section: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      isVisible: false
    };
  },

  computed: {
    classNames() {
      return useToggleClassName(this.isVisible, 'section', 'active');
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  @include xs {
    padding: 13px 0;
    border-bottom: 1px solid #e5e5e5;
  }

  &__title {
    font-family: $golos-bold;
    font-size: 16px;

    @include gt-xs {
      line-height: 20px;
    }

    @include xs {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      letter-spacing: 0.03px;

      &:after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 4px 0 4px;
        border-color: $color-dark-grey transparent transparent transparent;
      }
    }
  }

  &__list {
    margin-top: 8px;

    @include xs {
      display: none;
    }
  }

  &--active {
    & .list {
      @include xs {
        display: flex;
        flex-direction: column;
      }

      &__item {
        @include xs {
          // flex: 1 1 30%;

          // &:nth-child(3n + 2) {
          //   text-align: center;
          // }

          // &:nth-child(3n + 3) {
          //   text-align: right;
          // }
        }
      }
    }

    .section__title {
      &:after {
        transform: rotate(-180deg);
      }
    }
  }
}

.list {
  &__item {
    display: block;
    font-family: $golos-regular;
    letter-spacing: -0.01em;
    color: $color-dark-grey;

    @include gt-xs {
      font-size: 14px;
      line-height: 20px;
      padding: 6px 0;
    }

    @include xs {
      font-size: 12px;
      line-height: 16px;
      padding: 4px 0;
    }
  }
}
</style>
