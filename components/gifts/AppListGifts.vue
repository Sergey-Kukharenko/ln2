<template>
  <div>
    <div class="list-gifts">
      <div v-for="(item, idx) in list" :key="idx">
        <slot v-bind="{ ...item }"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppListGifts',

  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
.list-gifts {
  display: grid;
  margin-bottom: 20px;

  @include gt-sm {
    grid-gap: 12px;
    grid-template-columns: repeat(auto-fill, minmax(24%, 1fr));
  }

  @include lt-sm {
    grid-gap: 8px;
    grid-template-columns: repeat(auto-fill, minmax(48%, 1fr));
  }
}
</style>
