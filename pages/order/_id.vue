<template>
  <main class="order">
    <section class="order__wrapper">
      <div class="order__main">
        <order-title
          :is-paid="isPaid"
          :is-failed="isFailed"
          :in-process="isPaymentInProcess"
          :real-order-id="orderDetails?.real_id"
        />
        <order-panel
          title="Order Details"
          :icon="detailsIcon"
          has-toggle
          :toggle-status="isDetailVisible"
          @toggle="toggleDetail"
        />
        <template v-if="isDetailVisible">
          <order-panel title="Customer" icon="user-outline">
            <order-panel-body v-if="isCustomerData" name="customer" :pairs="customerDetails" />
          </order-panel>
          <order-panel title="Recipient" icon="user-outline">
            <template #top>
              <div v-show="isChangeButtonVisible" class="change-recipient" @click="changeRecipient">Change</div>
            </template>
            <template v-if="isRecipientEdit" #full>
              <order-recipient
                :recipient-name="recipientData.name || ''"
                :recipient-phone="recipientData.phone || ''"
                @submit-form="submitRecipientForm"
              />
            </template>
            <template v-else #default>
              <order-panel-body name="recipient" :pairs="recipientDetails" />
            </template>
          </order-panel>
          <order-panel title="Delivery" icon="place-outline">
            <order-panel-body v-if="isDeliveryData" name="recipient-delivery" :pairs="deliveryDetails" />
          </order-panel>
          <order-panel
            v-if="orderSplittedItems.length"
            class="order-composition"
            title="Order composition"
            icon="flower-box"
          >
            <order-items :list="orderSplittedItems" />
          </order-panel>
          <div v-if="isWhatsappButtonVisible" class="order-whatsapp">
            <order-whatsapp-button />
          </div>
          <div class="order-total">
            <div class="order-total__item">Total</div>
            <div id="order-total" class="order-total__item">£ {{ totalSum }}</div>
          </div>
        </template>
        <order-panel v-if="isPaymentElementsVisible" title="Payment" icon="money-circle-outline" class="payment">
          <template #top>
            <div class="change-payment" @click="openPaymentSelect">Change</div>
          </template>
          <template #full>
            <div class="select-payment">
              <!--              <svg-icon :name="paymentMethod.logo" class="select-payment__icon" />-->
              <app-select
                ref="payment-select"
                size="x-large"
                placeholder="Payment methods"
                :list="filteredAvailablePaymentMethods"
                pinned
                :hide-field="$device.isMobileOrTablet"
              >
                <template #label>
                  <div class="payment__select-label">
                    <div>{{ availablePaymentMethods[selectIndex].label }}</div>
                  </div>
                </template>
                <template #default="{ item, index, close }">
                  <div v-if="item?.label" @click="onClickPaymentSystem(index, close)">
                    <app-radio :value="selectIndex" :name="index" :has-icon="hasRadioIcon">
                      <payment-item :item="item" />
                    </app-radio>
                  </div>
                </template>
              </app-select>
            </div>
            <div class="select-payment--mobile">
              {{ availablePaymentMethods[selectIndex].label }}
            </div>
          </template>
        </order-panel>

        <payment-button
          v-if="isPaymentElementsVisible"
          :payment-method="paymentMethod"
          :order-id="orderId"
          :total-cost="orderDetails?.total_cost"
          @clear-time-id="clearTimeId"
          @addPayment="onAddPayment"
        />
        <order-panel v-else title="Payment" icon="money-circle-outline">
          <p>{{ getPaymentMethodLabel }}</p>
        </order-panel>
      </div>
      <order-details :order-details="orderDetails" @cancel="openModal" />
    </section>
    <!-- <div v-if="isPaid" class="payment__promo--mobile">
      <order-promo />
    </div> -->
    <!-- <div class="order-cancel" @click="openModal('OrderCancel')">Cancel the order</div> -->
    <app-modal :visible="isModalVisible" theme="centered" @close="closeModal">
      <component :is="currModal" @close="closeModal" @cancel-order="cancelOrder" />
    </app-modal>
  </main>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import * as paymentMethods from '~/data/payment-methods';
import OrderDetails from '~/components/OrderDetails';
import AppRadio from '~/components/shared/AppRadio';
import AppModal from '~/components/shared/AppModal';

import { disableScroll, enableScroll } from '~/helpers/scrollLock';
import { useObjectNotEmpty, useSizedImage } from '~/helpers';

import gtm from '~/mixins/gtm.vue';
import { GTM_EVENTS_MAP } from '~/constants/gtm';
import { AUTH_WITHOUT_SMS_COOKIE, PAYMENT_METHOD_COOKIE, RELOAD_ORDER_DELAY } from '~/constants';
import { PAYMENT_STATUS_MAP } from '~/constants/payment';
import OrderTitle from '~/components/OrderTitle.vue';
import OrderRecipient from '~/components/OrderRecipient.vue';
import OrderPanelBody from '~/components/OrderPanelBody.vue';
import OrderItems from '~/components/OrderItems.vue';
import PaymentItem from '~/components/PaymentItem.vue';

export default {
  name: 'OrderPage',

  components: {
    PaymentItem,
    OrderItems,
    OrderPanelBody,
    OrderRecipient,
    OrderTitle,
    OrderDetails,
    AppRadio,
    AppModal,
    OrderPanel: () => import('~/components/OrderPanel'),
    AppSelect: () => import('~/components/shared/AppSelect'),
    OrderWhatsappButton: () => import('~/components/OrderWhatsappButton'),
    PaymentButton: () => import('~/components/PaymentButton')
  },

  mixins: [gtm],

  validate({ redirect, route }) {
    return Boolean(route.params.id) || redirect({ name: 'index' });
  },

  data() {
    return {
      loading: false,

      currModal: '',
      isDetailVisible: true,
      isModalVisible: false,

      selectIndex: 0,

      timerId: null,

      availablePaymentMethods: Object.values(this.$options.PAYMENT_METHODS),

      isRecipientEdit: false
    };
  },

  PAYMENT_METHODS: paymentMethods,

  fetch() {
    const orderId = this.$route.params.id;

    if (!orderId) {
      return;
    }

    this.$store.dispatch('order/fetchOrder', orderId);
  },

  computed: {
    ...mapState('order', ['orderDetails']),

    ...mapGetters({
      paymentMethod: 'payment/getPaymentMethod'
    }),

    orderItems() {
      return this.orderDetails?.positions || [];
    },

    orderSplittedItems() {
      return this.orderItems.flatMap((e) => Array(e.quantity).fill({ ...e, quantity: 1 }));
    },

    filteredAvailablePaymentMethods() {
      return this.availablePaymentMethods.filter((p) => p.available);
    },

    getPaymentMethodLabel() {
      return (
        this.availablePaymentMethods.find((item) => item?.name === this.$cookies.get(PAYMENT_METHOD_COOKIE))?.label ||
        `By ${this.availablePaymentMethods[0]?.label}`
      );
    },

    detailsIcon() {
      return this.$device.isMobile ? 'article-green' : 'details';
    },

    hasRadioIcon() {
      return this.$device.isMobile;
    },

    recipientData() {
      return this.orderDetails?.recipient || {};
    },

    shippingAddress() {
      return this.orderDetails?.shipping_address;
    },

    intervalData() {
      return this.orderDetails?.interval || {};
    },

    getIntervalDate() {
      return this.intervalData?.date?.split('-').reverse().join('.');
    },

    deliveryAmount() {
      return +this.orderDetails?.delivery_amount ? `£ ${this.orderDetails?.delivery_amount}` : 'free delivery';
    },

    totalSum() {
      return this.orderDetails?.total_cost ?? 0;
    },

    isFailed() {
      return !!(this.orderDetails?.status === PAYMENT_STATUS_MAP.failPaid);
    },

    isPaid() {
      return !!(this.orderDetails?.status === PAYMENT_STATUS_MAP.paid);
    },

    isAwaitingPayment() {
      return !!(this.orderDetails?.status === PAYMENT_STATUS_MAP.payment);
    },

    orderId() {
      return this.orderDetails?.id || this.$route.params.id;
    },

    isPaymentInProcess() {
      return Boolean((this.$route.query.payment_intent || this.$route.query.paypal_redirect) && !this.isPaid);
    },

    isPaymentElementsVisible() {
      return (!this.isPaid && !this.isPaymentInProcess) || this.isFailed;
    },

    isWhatsappButtonVisible() {
      return this.isAwaitingPayment || this.isFailed || this.isPaymentInProcess;
    },

    customerData() {
      return this.orderDetails?.user || {};
    },

    getAddressText() {
      const address1 = this.shippingAddress.address1;
      const address2 = this.shippingAddress.address2 ? `, ${this.shippingAddress.address2}` : '';

      return address1 + address2;
    },

    isChangeButtonVisible() {
      return !this.isRecipientEdit && !this.isPaid;
    },

    hasGoogleAdsFired() {
      const hasGoogleAdsFiredValue = this.orderDetails.has_google_ads_fired;
      const isNull = hasGoogleAdsFiredValue === null;

      if (isNull) {
        return true;
      }

      return hasGoogleAdsFiredValue;
    },

    isPreorderPage() {
      return this.$route.name === 'preorder-id';
    },

    isOrderPage() {
      return this.$route.name === 'order-id';
    },

    recipientDetails() {
      return {
        name: this.recipientData?.name,
        tel: this.recipientData?.phone && `+${this.recipientData?.phone}`
      };
    },

    customerDetails() {
      return {
        name: this.customerData?.name,
        tel: `+${this.customerData?.phone}`,
        email: this.customerData?.email
      };
    },

    deliveryDetails() {
      return {
        city: this.shippingAddress?.city,
        address: (this.shippingAddress?.address1 || this.shippingAddress?.address2) && this.getAddressText,
        postcode: this.shippingAddress?.postal_code,
        date: this.intervalData?.date && this.getIntervalDate,
        time: this.intervalData?.time ? `${this.intervalData?.time}, ${this.deliveryAmount}` : `${this.deliveryAmount}`
      };
    },

    isCustomerData() {
      return useObjectNotEmpty(this.customerData);
    },

    isDeliveryData() {
      return useObjectNotEmpty(this.shippingAddress) || useObjectNotEmpty(this.intervalData);
    }
  },

  async mounted() {
    await this.$store.dispatch('payment/getClientIdPayPal');

    const STEP_INITIAL_VALUE = 1;
    let step = STEP_INITIAL_VALUE;

    const tick = async () => {
      step += STEP_INITIAL_VALUE;

      if (this.isPaid) {
        this.routeToOrderPage();

        if (this.isOrderPage) {
          this.clearTimeId();
          this.executeScriptEvents();

          return;
        }

        return;
      }

      if (!RELOAD_ORDER_DELAY[step]) {
        step = STEP_INITIAL_VALUE;
      }

      await this.initData();

      this.timerId = setTimeout(tick, RELOAD_ORDER_DELAY[step]);
    };

    this.timerId = setTimeout(tick, RELOAD_ORDER_DELAY[step]);
  },

  beforeDestroy() {
    if (this.isPaid) {
      this.$cookies.remove(AUTH_WITHOUT_SMS_COOKIE);
    }

    this.$cookies.remove(PAYMENT_METHOD_COOKIE);
    this.$store.commit('payment/setState', { paymentMethod: 'stripe' });

    this.clearTimeId();
  },

  methods: {
    useSizedImage,

    async executeScriptEvents() {
      if (this.hasGoogleAdsFired) {
        return;
      }

      this.gtmMultipleEvents();
      this.awinMultiple();
      this.fbTrack();
      this.addGtagUserDataScript();
      this.addGtagScript();
      await this.saveGadsData();
      console.log('gtag data has been sent');
    },

    submitRecipientForm() {
      this.isRecipientEdit = false;
      this.initData();
    },

    changeRecipient() {
      this.isRecipientEdit = true;
    },

    clearTimeId() {
      clearTimeout(this.timerId);
    },

    async initData() {
      const orderId = this.$route.params.id;

      if (!orderId) {
        this.clearTimeId();

        return;
      }

      if (!this.isPaid) {
        await this.$store.dispatch('order/fetchOrder', orderId);

        return;
      }

      this.routeToOrderPage();
    },

    routeToOrderPage() {
      this.isPreorderPage &&
        this.$router.push({
          name: 'order-id',
          params: this.$route.params,
          query: this.$route.query
        });
    },

    gtmMultipleEvents() {
      this.gtmClearItemEvent();
      this.dataLayerSetOriginalUrl();
      this.gtmPurchaseEvent();
    },

    fbTrack() {
      this.$fb.track('Purchase', { currency: 'GBP', value: this.orderDetails.total_cost });
    },

    addGtagScript() {
      const body = document.body;
      const script = document.createElement('script');

      script.innerHTML = `
        gtag('event', 'conversion', {
          'send_to': 'AW-11072963382/pLq_CPHXzIkYELaGgKAp',
          'value': '${this.orderDetails.total_cost}',
          'currency': 'GBP',
          'transaction_id': '${this.orderDetails.real_id}'
        });
      `;
      body.appendChild(script);
    },

    addGtagUserDataScript() {
      const body = document.body;
      const script = document.createElement('script');

      script.innerHTML = `
        gtag('set', 'user_data', {
          'phone_number': '+${this.orderDetails.user.phone}',
          'email': '${this.orderDetails.user?.email || ''}',
          'address': {
            'first_name': '${this.orderDetails.user.name}',
            'last_name': '',
            'street': '${this.orderDetails.shipping_address.address1}',
            'city': '${this.orderDetails.shipping_address.city}',
            'region': '',
            'postal_code': '${this.orderDetails.shipping_address.postal_code}',
            'country': 'UK'
          }
        });
      `;
      body.appendChild(script);
    },

    async saveGadsData() {
      const gadsObj = {
        page_hostname: window.location.host,
        page_location: window.location.origin,
        page_path: window.location.pathname,
        total_cost: this.orderDetails.total_cost,
        order_id: this.orderDetails.real_id,
        phone_number: +this.orderDetails.user.phone,
        address: {
          first_name: this.orderDetails.user.name,
          street: this.orderDetails.shipping_address.address1,
          city: this.orderDetails.shipping_address.city,
          postal_code: this.orderDetails.shipping_address.postal_code
        }
      };

      try {
        const { success } = await this.$http.$post('/v1/order/google-ads-fire-info', gadsObj);
        if (!success) console.log('the data was not recorded on the backend');
      } catch (err) {
        console.error(err);
      }
    },

    addAwinImage() {
      const img = document.createElement('img');
      const url = `${process.env.AWIN_URL}sread.img`;
      const params = new URLSearchParams({
        tt: 'ns',
        tv: '2',
        merchant: process.env.AWIN_ID,
        amount: this.orderDetails.total_cost,
        cr: this.orderDetails.currency,
        ref: this.orderDetails.id,
        parts: `DEFAULT:${this.orderDetails.total_cost}`,
        vc: '',
        ch: 'aw',
        testmode: '0'
      });

      img.src = decodeURIComponent(`${url}?${params}`);
      img.style.cssText = `width: 0; height: 0; border: 0; position: fixed; z-index: -1;`;
      const body = document.body;
      body.appendChild(img);
    },

    addAwinScript() {
      let timeout;
      const tick = () => {
        timeout = setTimeout(() => {
          if ('AWIN' in window) {
            window.AWIN.Tracking.Sale = {
              amount: `${this.orderDetails.total_cost}`,
              orderRef: `${this.orderDetails.id}`,
              parts: `DEFAULT:${this.orderDetails.total_cost}`,
              voucher: '',
              currency: `${this.orderDetails.currency}`,
              test: '0',
              channel: 'aw'
            };

            // eslint-disable-next-line no-undef
            AWIN.Tracking.run();

            clearTimeout(timeout);
            return;
          }
          tick();
        }, 1000);
      };

      tick();
    },

    awinMultiple() {
      this.addAwinImage();
      this.addAwinScript();
    },

    onClickPaymentSystem(index, close) {
      this.selectIndex = index;
      this.$store.commit('payment/setState', { paymentMethod: this.availablePaymentMethods[index].name });
      this.$cookies.set(PAYMENT_METHOD_COOKIE, this.availablePaymentMethods[index].name);

      if (!close) {
        return;
      }

      close();
    },

    setIcon(icon) {
      this.paymentMethod.logo = icon;
    },

    toggleDetail() {
      this.isDetailVisible = !this.isDetailVisible;
    },

    openPaymentSelect() {
      this.$refs['payment-select'].onClickField();
    },

    openModal(name) {
      this.currModal = name;
      this.isModalVisible = true;
      disableScroll();
    },

    closeModal() {
      this.isModalVisible = false;
      this.currModal = '';
      enableScroll();
    },

    cancelOrder() {
      this.closeModal();
      this.$router.push({ name: 'index' });
    },

    gtmPurchaseEvent() {
      const items = this.orderItems.map((item) => ({
        item_name: item.offer_title,
        item_id: item.offer_real_id,
        price: item.price,
        item_brand: 'myflowers',
        item_category: item.base_category_name,
        item_variant: item.title,
        quantity: item.quantity
      }));

      this.$gtm.push({
        event: GTM_EVENTS_MAP.purchase,
        ecommerce: {
          transaction_id: this.orderDetails.real_id,
          affiliation: 'cart',
          value: this.totalSum,
          tax: 0,
          shipping: 0,
          currency: 'GBP',
          coupon: 0,
          items
        }
      });
    },

    onAddPayment(paymentName) {
      const paymentMethodIndex = this.availablePaymentMethods.findIndex((p) => p.title === paymentName);

      if (paymentMethodIndex === -1) {
        return;
      }
      this.availablePaymentMethods[paymentMethodIndex].available = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.order {
  width: 100%;
  background: #ffffff;

  @include gt-sm {
    padding-bottom: 133px;
  }

  @include lt-md {
    position: relative;
    z-index: 8;
  }

  & > * {
    max-width: 1080px;
    margin: 0 auto;

    @include lt-lg {
      padding: 0 16px;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: row;
    gap: 24px;
    padding-top: 24px;

    @include lt-lg {
      flex-direction: column;
      gap: 32px;
      background: #ffffff;
      border-radius: 0 0 16px 16px;
    }
  }

  &__main {
    flex: 1 1 auto;
    min-width: 0;
    max-width: 100%;

    display: flex;
    flex-direction: column;
    gap: 24px;

    @include lt-lg {
      gap: 16px;
    }

    .order-whatsapp {
      @include gt-sm {
        display: none;
      }

      @include lt-md {
        border-top: 1px solid #eaeaea;
        padding-top: 16px;
      }
    }

    .order-total {
      @include gt-sm {
        display: none;
      }

      @include lt-md {
        display: flex;
        justify-content: space-between;
        padding: 16px 0;
        border-top: 1px solid #eaeaea;
        border-bottom: 1px solid #eaeaea;
        bottom: 1px;

        &__item {
          font-family: $golos-bold;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 20px;
          color: #1f2226;
        }
      }
    }

    .order-composition {
      @include gt-sm {
        display: none;
      }
    }

    .select-payment {
      @include gt-sm {
        display: flex;
        align-items: center;
        margin-top: 13px;
        background: #f7f7f7;
        border-radius: 10px;
        box-sizing: border-box;
      }

      &__icon {
        width: 24px;
        height: 24px;
      }

      .app-select {
        flex: 1;
      }

      //@include lt-md {
      //  display: none;
      //}

      &--mobile {
        @include gt-sm {
          display: none;
        }

        font-family: $golos-regular;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.01em;
        color: #7c7c7c;

        box-sizing: border-box;
        padding-left: 48px;
      }
    }

    .change-payment {
      @include gt-sm {
        display: none;
      }

      @include lt-md {
        font-family: $golos-medium;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        text-align: right;
        letter-spacing: -0.01em;
        color: $color-green;
        user-select: none;
      }
    }

    .change-recipient {
      font-family: $golos-regular;
      font-weight: 500;
      color: $color-dark-green;

      @include gt-sm {
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0em;
        cursor: pointer;
      }

      @include lt-md {
        font-size: 12px;
        line-height: 16px;
        letter-spacing: -0.02em;
      }
    }
  }

  &__notification {
    @include lt-md {
      margin-top: 16px;
    }

    margin-top: 10px;
  }
}

.order-cancel {
  @include gt-sm {
    display: none;
  }

  @include lt-md {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    margin-top: 16px;

    font-family: $golos-medium;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #db1838;
  }
}

.payment {
  z-index: 4;
}

.payment__promo {
  @include lt-md {
    display: none;
  }

  &--mobile {
    @include gt-sm {
      display: none;
    }

    padding: 0;
  }
}
</style>
