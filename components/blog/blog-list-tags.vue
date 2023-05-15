<template>
  <div class="blog-list-tags">
    <blog-tag v-for="item in list" :key="item.text" :item="item" />
  </div>
</template>

<script>
import BlogTag from '~/components/blog/blog-tag.vue';

export default {
  name: 'BlogListTags',
  components: { BlogTag },

  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
.blog-list-tags {
  display: flex;
  align-items: center;

  @include gt-sm {
    margin: 0 -4px;
  }

  @include lt-md {
    overflow: hidden;
    overflow-x: auto;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
