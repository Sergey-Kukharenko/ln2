<template>
  <div class="sections">
    <div v-for="(list, title) in section" :key="title" class="sections__item">
      <slot v-bind="{ list, title }"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppMenuSections',

  props: {
    section: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style lang="scss" scoped>
.sections {
  display: flex;
  margin: 0 -16px;
}
</style>
