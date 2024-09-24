<template>
  <div class="profile-aside">
    <div class="title">Order details</div>
    <profile-aside-steps :status="orderDetails.status" />
    <profile-aside-order-contents>
      <profile-aside-order-list :contents="contents" />
      <profile-aside-order-row :item="sale" color="green" />
      <profile-aside-order-row :item="delivery" />
    </profile-aside-order-contents>
    <profile-aside-order-row :item="total" size="large" />

    <profile-buttons-group :status="status" />
  </div>
</template>

<script>
import ProfileButtonsGroup from '~/components/profile/ProfileButtonsGroup.vue';
import ProfileAsideOrderContents from '~/components/profile/profile-aside/ProfileAsideOrderContents.vue';
import ProfileAsideOrderList from '~/components/profile/profile-aside/ProfileAsideOrderList.vue';
import ProfileAsideOrderRow from '~/components/profile/profile-aside/ProfileAsideOrderRow.vue';
import ProfileAsideSteps from '~/components/profile/profile-aside/ProfileAsideSteps.vue';

export default {
  name: 'ProfileAside',

  components: {
    ProfileButtonsGroup,
    ProfileAsideOrderList,
    ProfileAsideOrderRow,
    ProfileAsideOrderContents,
    ProfileAsideSteps
  },

  props: {
    orderDetails: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    contents() {
      return {
        list: this.orderDetails.positions,
        price: '£ 94'
      };
    },

    delivery() {
      return {
        label: 'Delivery',
        value: +this?.orderDetails.deliveryAmount ? `£ ${this?.orderDetails.deliveryAmount}` : 'Free'
      };
    },

    sale() {
      return {
        label: 'Sale',
        value: `£ ${this.orderDetails.sale}`
      };
    },

    total() {
      return {
        label: 'Total',
        value: '£ ' + this.orderDetails.totalCost
      };
    }
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
