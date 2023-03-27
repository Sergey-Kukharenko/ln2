<template functional>
  <div class="dots">
    <div v-for="dot in $options.DOTS_ROW" :key="dot" class="dots__item"></div>
  </div>
</template>

<script>
const DOTS_ROW = 3;

export default {
  DOTS_ROW,

  name: 'AppLoadingDots'
};
</script>

<style lang="scss">
.dots {
  display: flex;
  gap: 3px;
  width: fit-content;

  &__item {
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: #ffffff;

    &:nth-last-child(1),
    &:nth-last-child(3) {
      animation: fadeAnimation 1s 0.6s linear infinite;
    }
    &:nth-last-child(2) {
      animation: fadeAnimation 1s 0.3s linear infinite;
    }
  }
}

@keyframes fadeAnimation {
  0% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
}
</style>
