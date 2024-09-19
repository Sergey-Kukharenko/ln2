<template>
  <div class="notification">
    <svg-icon class="notification__icon" name="check-green-rounded" />
    <div class="notification__text">Your account was successfully registered with us.</div>
  </div>
</template>

<script>
export default {
  name: 'AuthCompletedNotification'
};
</script>

<style lang="scss" scoped>
.notification {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: $bg-green;
  gap: 12px;
  width: 100%;

  @include gt-sm {
    padding: 19px 0;
  }

  @include lt-md {
    flex-direction: column;
    padding: 10px 0;
  }

  &__icon {
    width: 32px;
    height: 32px;
  }

  &__text {
    font-family: $golos-medium;
    font-size: 16px;
    font-weight: 500;
    line-height: 19.2px;
    letter-spacing: -0.01em;
    text-align: center;
  }
}
</style>
