<template>
  <div class="profile-alert">
    <svg-icon name="profile-check" class="icon" />
    Your account was successfully registered with us.
  </div>
</template>

<script>
export default {
  name: 'ProfileAlert'
};
</script>

<style scoped lang="scss">
.profile-alert {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: $golos-medium;
  background: $bg-green;
  border-radius: 20px;

  @include gt-sm {
    font-size: 16px;
    line-height: 19.2px;
    letter-spacing: -0.01em;
    padding: 19px 10px;
  }

  @include lt-md {
    flex-direction: column;
    gap: 12px;
    padding: 8px;
    font-size: 14px;
    line-height: 18.2px;
    text-align: center;
  }
}

.icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
}
</style>
