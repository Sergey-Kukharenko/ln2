<template>
  <div class="order">
    <div class="title">Your order №. 2352-083 was created!</div>
    <div class="container">
      <div class="content">
        <order-panel title="Recipient" icon="user-outline">
          <template #default>
            <order-panel-body name="recipient" :pairs="recipientDetails" />
          </template>
        </order-panel>
        <order-panel title="Delivery" icon="place-outline">
          <template #default>
            <order-panel-body name="recipient-delivery" :pairs="deliveryDetails" />
          </template>
        </order-panel>
        <order-panel title="Payment" icon="money-circle-outline">
          <p>By Debit/Credit card (Apple/Google pay)</p>
        </order-panel>
      </div>
      <profile-aside />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import OrderPanel from '~/components/OrderPanel.vue';
import OrderPanelBody from '~/components/OrderPanelBody.vue';
import ProfileAside from '~/components/profile/profile-aside/profile-aside.vue';

export default Vue.extend({
  name: 'OrderPage',
  components: { OrderPanelBody, OrderPanel, ProfileAside },

  layout: 'profile',

  data() {
    return {
      recipient: {
        name: 'Maria Sazontova',
        phone: '+7 (999) 123-45-67'
      },

      delivery: {
        city: 'London',
        address: '15 Westferry Road',
        postcode: 'E14 8FQ',
        date: '07.08.24',
        time: '3:00 - 6:00 pm, free delivery'
      }
    };
  },

  computed: {
    recipientDetails() {
      return {
        name: this.recipient?.name,
        tel: this.recipient?.phone
      };
    },

    deliveryDetails() {
      return {
        city: this.delivery?.city,
        address: this.delivery.address,
        postcode: this.delivery?.postcode,
        date: this.delivery?.date,
        time: this.delivery?.time
      };
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
  display: flex;
  align-items: flex-start;
  gap: 32px;
  margin-top: 32px;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
