<template>
  <div class="go-back" @click="$emit('change-step')">
    <svg-icon class="go-back__icon" name="chevron-right" />
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'AuthGoBackButton'
});
</script>

<style lang="scss" scoped>
.go-back {
  padding-left: 8px;
  width: 36px;

  &__icon {
    user-select: none;
    width: 16px;
    height: 16px;
    transform: rotate(180deg);
  }
}
</style>
