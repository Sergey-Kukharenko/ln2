<template>
  <div class="profile-aside">
    <div class="title">Order details</div>
    <profile-aside-steps />
    <div class="group" style="display: none">
      <a
        href="https://api.whatsapp.com/send?phone=447300887398"
        target="_blank"
        rel="nofollow noopener"
        class="button-whatsapp"
      >
        <svg-icon name="whatsapp-outline-green" />
        Having issues? Write us on whatsapp
      </a>
      <app-button theme="text-only" stretch="full" behavior="custom">Cancel the order</app-button>
    </div>
  </div>
</template>

<script>
import ProfileAsideSteps from '~/components/profile/profile-aside-steps.vue';
import AppButton from '~/components/shared/AppButton.vue';

export default {
  name: 'ProfileAside',
  components: { AppButton, ProfileAsideSteps }
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
    padding: 24px 23px;
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

.group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.button-whatsapp {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 6px;
  color: $color-green;
  border: 1px solid $color-green;
  border-radius: 12px;
  font-family: $golos-medium;
  font-size: 14px;
  line-height: 24px;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
