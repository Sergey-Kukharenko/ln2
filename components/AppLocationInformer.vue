<template>
  <div class="layout--horizontal location-informer">
    <svg-icon name="location-filled" />
    <div class="location-informer__caption">Flower delivery <span class="green">in London</span></div>
  </div>
</template>

<script>
export default {
  name: 'AppLocationInformer'
};
</script>

<style scoped lang="scss">
.location-informer {
  display: flex;
  align-items: center;
  margin: 16px 0;

  & .icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }

  &__caption {
    flex: 1;
    margin-left: 8px;
    font-family: $golos-regular;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: $color-dark-grey;
  }
}

.green {
  color: $color-dark-green;
}
</style>
