<template>
  <div class="profile-aside">
    <div class="title">Order details</div>

    <profile-aside-steps />
    <profile-aside-order-contents>
      <profile-aside-order-list :contents="order.contents" />
      <profile-aside-order-row :item="order.sale" color="green" />
      <profile-aside-order-row :item="order.delivery" />
      <profile-aside-order-row :item="order.total" size="large" />
    </profile-aside-order-contents>

    <div class="group">
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
import ProfileAsideOrderContents from '~/components/profile/profile-aside/profile-aside-order-contents.vue';
import ProfileAsideOrderList from '~/components/profile/profile-aside/profile-aside-order-list.vue';
import ProfileAsideOrderRow from '~/components/profile/profile-aside/profile-aside-order-row.vue';
import ProfileAsideSteps from '~/components/profile/profile-aside/profile-aside-steps.vue';
import AppButton from '~/components/shared/AppButton.vue';

export default {
  name: 'ProfileAside',

  components: { ProfileAsideOrderList, ProfileAsideOrderRow, ProfileAsideOrderContents, AppButton, ProfileAsideSteps },

  data() {
    return {
      order: {
        contents: {
          list: [
            {
              id: 0,
              img: 'https://cdn.myflowers.co.uk/media/images/offers/id289/size10/1.webp',
              title: 'Whisper'
            },
            {
              id: 1,
              img: 'https://cdn.myflowers.co.uk/media/images/offers/id141/size10/1.webp',
              title: 'Chocolate Selection 125g'
            }
          ],
          price: '£ 94'
        },
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
