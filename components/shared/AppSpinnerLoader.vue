<template functional>
  <div :class="data.staticClass || ''" class="spinner-loader" :style="`--spinner-size: ${props.size}px`"></div>
</template>

<script>
export default {
  name: 'AppSpinnerLoader',

  props: {
    size: {
      type: [String, Number],
      default: 48
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner-loader {
  width: var(--spinner-size, 48px);
  height: var(--spinner-size, 48px);
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #26ad4f;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
</style>
