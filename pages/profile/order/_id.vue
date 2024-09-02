<template>
  <div class="order">
    <div class="title">Your order №. {{ id }} {{ getStatusText }}</div>
    <profile-aside-steps v-if="$device.isMobile" />
    <div class="container">
      <div class="content">
        <div class="section">
          <order-panel title="Recipient" icon="user-outline" :size="toggleableSize">
            <template #default>
              <order-panel-body name="recipient" :pairs="recipientDetails" />
            </template>
          </order-panel>
        </div>
        <div class="section">
          <order-panel title="Delivery" icon="place-outline" :size="toggleableSize">
            <template #default>
              <order-panel-body name="recipient-delivery" :pairs="deliveryDetails" />
            </template>
          </order-panel>
        </div>
        <div class="section">
          <order-panel title="Payment methods" icon="money-circle-outline" :size="toggleableSize">
            <p>By Debit/Credit card (Apple/Google pay)</p>
          </order-panel>
        </div>
        <div class="section">
          <profile-slide-toggle
            v-if="$device.isMobile && orderSplitedItems.length"
            title="Order composition"
            icon="flower-box"
            is-visible
          >
            <order-items :list="orderSplitedItems" />
          </profile-slide-toggle>
        </div>
        <div v-if="$device.isMobile" class="section">
          <profile-aside-order-row :item="total" size="large" apply-to-all />
          <profile-buttons-group />
        </div>
      </div>
      <profile-aside v-if="$device.isDesktopOrTablet" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import OrderItems from '~/components/OrderItems.vue';
import OrderPanel from '~/components/OrderPanel.vue';
import OrderPanelBody from '~/components/OrderPanelBody.vue';
import ProfileAsideOrderRow from '~/components/profile/profile-aside/profile-aside-order-row.vue';
import ProfileAsideSteps from '~/components/profile/profile-aside/profile-aside-steps.vue';
import ProfileAside from '~/components/profile/profile-aside/profile-aside.vue';
import ProfileButtonsGroup from '~/components/profile/profile-buttons-group.vue';
import ProfileSlideToggle from '~/components/profile/profile-slide-toggle.vue';
import { MAP_PROFILE_STATUSES } from '~/constants';
import profile from '~/data/profile';

const { recipient, shippingAddress, interval, deliveryAmount, positions, status, id, totalCost } = profile.pages.order;
export default Vue.extend({
  name: 'OrderPage',

  components: {
    ProfileSlideToggle,
    ProfileAsideOrderRow,
    ProfileButtonsGroup,
    ProfileAsideSteps,
    OrderItems,
    OrderPanelBody,
    OrderPanel,
    ProfileAside
  },

  layout: 'profile',

  data() {
    return {
      recipient,
      shippingAddress,
      interval,
      deliveryAmount,
      positions,
      status,
      id,
      total: {
        label: 'Total',
        value: '£ ' + totalCost
      }
    };
  },

  MAP_PROFILE_STATUSES,

  computed: {
    getStatusText() {
      return MAP_PROFILE_STATUSES[this.status];
    },

    toggleableSize() {
      return this.$device.isMobile ? 'small' : 'medium';
    },

    recipientDetails() {
      return {
        name: this.recipient?.name,
        tel: this.recipient?.phone
      };
    },

    intervalData() {
      return this?.interval || {};
    },

    getIntervalDate() {
      return this.intervalData?.date?.split('-').reverse().join('.');
    },

    getAddressText() {
      const address1 = this.shippingAddress.address1 || '';
      const address2 = this.shippingAddress.address2 || '';
      const splitter = address1 && address2 ? ', ' : '';

      return address1 + splitter + address2;
    },

    getDeliveryAmount() {
      return +this?.deliveryAmount ? `£ ${this?.deliveryAmount}` : 'free delivery';
    },

    deliveryDetails() {
      return {
        city: this.shippingAddress?.city,
        address: this.getAddressText,
        postcode: this.shippingAddress?.postal_code,
        date: this.intervalData?.date && this.getIntervalDate,
        time: this.intervalData?.time && `${this.intervalData?.time}, ${this.getDeliveryAmount}`
      };
    },

    orderItems() {
      return this?.positions || [];
    },

    orderSplitedItems() {
      return this.orderItems.flatMap((e) => Array(e.quantity).fill({ ...e, quantity: 1 }));
    }
  }
});
</script>
<style scoped lang="scss">
.title {
  @include gt-sm {
    font-family: $Literata;
    font-size: 28px;
    font-weight: 700;
    line-height: 32px;
  }

  @include lt-md {
    font-family: $golos-bold;
    font-size: 20px;
    line-height: 24px;
  }
}

.container {
  @include gt-sm {
    display: flex;
    align-items: flex-start;
    gap: 32px;
    margin-top: 32px;
  }

  @include lt-md {
    margin-top: 20px;
  }
}

.content {
  @include gt-sm {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}

.section {
  @include lt-md {
    padding: 16px 0;
    border-top: 1px solid #eaeaea;
  }
}
</style>
