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
  margin: 14px 0 16px;
  padding: 14px 0;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
}
</style>
