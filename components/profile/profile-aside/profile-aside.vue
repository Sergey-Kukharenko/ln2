<template>
  <div class="profile-aside">
    <div class="title">Order details</div>

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
    <profile-aside-steps />
    <profile-aside-order-contents>
      <profile-aside-order-row :item="order.sale" color="green" />
      <profile-aside-order-row :item="order.delivery" />
      <profile-aside-order-row :item="order.total" size="large" />
    </profile-aside-order-contents>
  </div>
</template>

<script>
import ProfileAsideOrderContents from '~/components/profile/profile-aside/profile-aside-order-contents.vue';
import ProfileAsideOrderRow from '~/components/profile/profile-aside/profile-aside-order-row.vue';
import ProfileAsideSteps from '~/components/profile/profile-aside/profile-aside-steps.vue';
import AppButton from '~/components/shared/AppButton.vue';

export default {
  name: 'ProfileAside',

  components: { ProfileAsideOrderRow, ProfileAsideOrderContents, AppButton, ProfileAsideSteps },

  data() {
    return {
      order: {
        sale: {
          label: 'Sale',
          value: '- £ 8'
        },
        delivery: {
          label: 'Delivery',
          value: 'Free'
        },
        total: {
          label: 'Total',
          value: '£ 86'
        }
      }
    };
  }
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
