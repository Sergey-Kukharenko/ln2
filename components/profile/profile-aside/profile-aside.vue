<template>
  <div class="profile-aside">
    <div class="title">Order details</div>

    <profile-aside-steps />
    <profile-aside-order-contents>
      <profile-aside-order-list :contents="order.contents" />
      <profile-aside-order-row :item="order.sale" color="green" />
      <profile-aside-order-row :item="order.delivery" />
    </profile-aside-order-contents>
    <profile-aside-order-row :item="order.total" size="large" />

    <profile-buttons-group />
  </div>
</template>

<script>
import ProfileAsideOrderContents from '~/components/profile/profile-aside/profile-aside-order-contents.vue';
import ProfileAsideOrderList from '~/components/profile/profile-aside/profile-aside-order-list.vue';
import ProfileAsideOrderRow from '~/components/profile/profile-aside/profile-aside-order-row.vue';
import ProfileAsideSteps from '~/components/profile/profile-aside/profile-aside-steps.vue';
import ProfileButtonsGroup from '~/components/profile/profile-buttons-group.vue';
import profile from '~/data/profile';

const { positions } = profile.pages.order;
export default {
  name: 'ProfileAside',

  components: {
    ProfileButtonsGroup,
    ProfileAsideOrderList,
    ProfileAsideOrderRow,
    ProfileAsideOrderContents,
    ProfileAsideSteps
  },

  data() {
    return {
      order: {
        contents: {
          list: positions,
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
    width: 344px;
    padding: 23px;
    border: 1px solid #eaeaea;
    border-radius: 12px;
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
