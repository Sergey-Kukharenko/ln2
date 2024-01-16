<template>
  <div class="card-tag">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppCardTag'
};
</script>

<style scoped lang="scss">
.card-tag {
  position: relative;
  border-radius: 0 8px 0 0;
  font-family: $golos-regular;
  color: $color-white-grey;

  &:first-child {
    background: #fff;
    z-index: 2;
  }

  &:not(:first-child) {
    background: $bg-grey;
    margin-left: -6px;
    z-index: 1;
  }
}
</style>
