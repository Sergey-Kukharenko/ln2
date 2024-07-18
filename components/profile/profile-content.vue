<template>
  <div class="profile-content">
    <slot />
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'ProfileContent'
});
</script>

<style scoped lang="scss">
.profile-content {
  width: 100%;
  display: flex;
  flex-direction: column;

  @include gt-sm {
    gap: 40px;
  }
}
</style>
