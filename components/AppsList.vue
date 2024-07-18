<template>
  <div class="apps-list">
    <a v-for="(item, idx) in list" :key="idx">
      <svg-icon :name="item.icon" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'AppsList',

  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
.apps-list {
  display: flex;
  column-gap: 8px;
}
.icon {
  width: 110px;
  height: 32px;
}
</style>
