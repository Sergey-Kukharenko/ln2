<template>
  <div class="blog-list" :class="classes">
    <div v-for="(item, idx) in list" :key="idx" class="blog-list__item">
      <slot v-bind="{ ...item }"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogList',

  props: {
    list: {
      type: Array,
      default: () => []
    },

    containsLargeCards: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes() {
      return {
        'contains-large-cards': this.containsLargeCards
      };
    }
  }
};
</script>

<style scoped lang="scss">
.blog-list {
  display: flex;
  flex-wrap: wrap;

  @include gt-sm {
    margin: 0 -12px;
  }

  @include lt-md {
    margin: 8px 0;
  }

  &__item {
    display: flex;

    @include gt-sm {
      width: calc(33.3333% - 24px);
      margin: 12px;
      box-sizing: border-box;
    }

    @include lt-md {
      margin: 8px 0;
    }
  }

  &.contains-large-cards {
    .blog-list__item {
      &:not(:nth-child(1), :nth-child(2)) {
        @include gt-sm {
          width: calc(33.3333% - 24px);
        }
      }

      &:nth-child(1),
      &:nth-child(2) {
        @include gt-sm {
          width: calc(50% - 24px);
        }
      }
    }
  }
}
</style>
