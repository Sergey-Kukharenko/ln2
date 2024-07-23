<template>
  <div class="list-switch">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppListSwitch'
};
</script>

<style lang="scss" scoped>
.list-switch {
  display: flex;
  flex-direction: column;

  @include gt-sm {
    gap: 8px;
  }

  @include lt-md {
    gap: 12px;
  }
}
</style>
