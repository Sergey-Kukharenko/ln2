<template>
  <div class="layout profile-empty">
    <div class="profile-empty__container">
      <div class="title profile-empty__title">It's empty here :(</div>

      <div class="profile-empty__caption">
        <div class="profile-empty__caption-text">You do not have active orders and products you like!</div>
        <div class="profile-empty__caption-text">You can use the search to find everything you need.</div>
      </div>

      <nuxt-link to="/" class="profile-empty__button"> Go to shopping</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileEmpty'
};
</script>

<style scoped lang="scss">
.profile-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: $color-dark-grey;
  text-align: center;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 0 4px 32px 0 #0000001a;

  @include gt-sm {
    min-height: 392px;
    padding: 32px 20px;
  }

  @include lt-md {
    padding: 56px 20px;
  }

  &__title {
    font-family: $golos-bold;
    font-size: 18px;
    line-height: 21.6px;
    letter-spacing: -0.02em;
  }

  &__caption {
    padding: 8px 0 32px;
  }

  &__caption-text {
    font-family: $golos-medium;
    font-size: 14px;
    line-height: 18.2px;
    letter-spacing: -0.01em;
  }

  &__button {
    display: inline-block;
    min-width: 164px;
    font-family: $golos-medium;
    line-height: 36px;
    color: #fff;
    background: #06ad5d;
    box-sizing: border-box;
    border-radius: 12px;
    margin: 0 auto;
  }
}
</style>
