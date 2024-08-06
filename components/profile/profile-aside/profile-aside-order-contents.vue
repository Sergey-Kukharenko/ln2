<template>
  <div class="profile-aside-order-contents">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ProfileAsideOrderContents'
};
</script>

<style scoped lang="scss">
.profile-aside-order-contents {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
