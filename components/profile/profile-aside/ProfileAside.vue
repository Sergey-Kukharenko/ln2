<template>
  <div class="profile-aside">
    <div class="title">Order details</div>
    <profile-aside-steps :status="order.status" />
    <profile-aside-order-contents>
      <profile-aside-order-list :contents="order.contents" />
      <profile-aside-order-row :item="order.sale" color="green" />
      <profile-aside-order-row :item="order.delivery" />
    </profile-aside-order-contents>
    <profile-aside-order-row :item="order.total" size="large" />

    <profile-buttons-group :status="order.status" />
  </div>
</template>

<script>
import ProfileButtonsGroup from '~/components/profile/ProfileButtonsGroup.vue';
import ProfileAsideOrderContents from '~/components/profile/profile-aside/ProfileAsideOrderContents.vue';
import ProfileAsideOrderList from '~/components/profile/profile-aside/ProfileAsideOrderList.vue';
import ProfileAsideOrderRow from '~/components/profile/profile-aside/ProfileAsideOrderRow.vue';
import ProfileAsideSteps from '~/components/profile/profile-aside/ProfileAsideSteps.vue';
import profile from '~/data/profile';

const { products, totalCost, status } = profile.pages.order;
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
          list: products,
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
          value: '£ ' + totalCost
        },
        status
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
