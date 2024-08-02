<template>
  <div class="profile-aside">
    <div class="title">Order details</div>
    <profile-aside-steps />
  </div>
</template>

<script>
import ProfileAsideSteps from '~/components/profile/profile-aside-steps.vue';

export default {
  name: 'ProfileAside',
  components: { ProfileAsideSteps }
};
</script>

<style scoped lang="scss">
.profile-aside {
  box-sizing: border-box;

  @include gt-sm {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 344px;
    min-height: 430px;
    padding: 24px;
    border: 1px solid #eaeaea;
    border-radius: 32px;
  }

  @include lt-md {
    width: 100%;
  }
}

.title {
  @include gt-sm {
    font-family: $golos-bold;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
  }

  @include lt-md {
    display: none;
  }
}
</style>
