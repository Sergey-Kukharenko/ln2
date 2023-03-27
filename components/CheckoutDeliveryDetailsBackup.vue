<template>
  <checkout-pane title="Delivery details" :delim="true">
    <transition>
      <div v-show="!isClarified" class="delivery-details__address">
        <!-- <app-select placeholder="Choose delivery address" size="x-large" :list="addressList">
        <template #default="{ item, close, setLabel }">
          <div class="delivery-details__address-item" @click="onClickAddressItem(item, close, setLabel)">
            <div class="delivery-details__address-item-left">
              <app-radio v-model="form.addressSelect" :name="item.id" />
              <div>{{ item.label }}</div>
            </div>
            <div class="delivery-details__address-item-right" @click.stop="editAddress(item, close)">
              <svg-icon class="delivery-details__icon-edit" name="edit" />
            </div>
          </div>
        </template>
      </app-select> -->
        <app-input
          v-model="form.address"
          placeholder="Set delivery address"
          size="x-large"
          readonly
          @click.native="$refs.addressModal.open()"
        >
          <template #right>
            <basket-button align="center" size="small" theme="white">{{ addressText }}</basket-button>
          </template>
        </app-input>
      </div>
    </transition>

    <checkout-modal ref="addressModal" :width="712">
      <template #title>{{ addressText }} address</template>
      <template #default>
        <div class="delivery-details__modal-content">
          <app-input
            :value="modalForm.postalCode"
            placeholder="Postcode"
            size="x-large"
            class="delivery-details__modal-window-input"
            @input="onTypingAddressOrPostalCode($event, 'postalCode')"
            @focus="onInputFocus"
            @blur="onInputBlur"
          >
            <!-- <template #right>
              <basket-button size="small" theme="white"> Find</basket-button>
            </template> -->
          </app-input>
          <div class="delivery-details__modal-window-address">
            <app-input
              :value="modalForm.address1"
              placeholder="Address line 1"
              size="x-large"
              :error="modalForm.error"
              class="delivery-details__modal-window-input"
              @focus="onInputFocus"
              @blur="onInputBlur"
              @input="onTypingAddressOrPostalCode($event, 'address1')"
            />
            <app-input
              v-model="modalForm.address2"
              placeholder="Address line 2"
              size="x-large"
              class="delivery-details__modal-window-input"
            />
          </div>
          <app-textarea
            v-model="modalForm.comment"
            placeholder="Commentary for courier"
            class="delivery-details__modal-window-textarea"
          />
          <basket-button align="center" class="delivery-details__modal-window-button" @click="saveAddress"
            >Save address</basket-button
          >

          <ul v-if="suggestions.length" class="delivery-details__modal-suggestions" :style="suggestionsStyle">
            <li
              v-for="suggest in suggestions"
              :key="suggest.public_id"
              class="delivery-details__modal-suggestions-item"
              @mousedown="onChooseSuggestion(suggest)"
              v-text="suggest.name || suggest.description"
            ></li>
          </ul>
        </div>
      </template>
    </checkout-modal>
    <div class="delivery-details__clarify">
      <checkout-clarify :status="isClarified" />
    </div>
  </checkout-pane>
</template>

<script>
import debounce from 'lodash.debounce';
// import AppSelect from '~/components/shared/AppSelect';
import AppInput from '~/components/shared/AppInput';
// import AppRadio from '~/components/shared/AppRadio';
import CheckoutModal from '~/components/CheckoutModal';
import AppTextarea from '~/components/shared/AppTextarea';

import { CHECKOUT_INPUT_DELAY } from '~/constants';
import { VALIDATE_MESSAGES } from '~/messages';

import { woosMapService } from '@/services/woosMapService';

export default {
  name: 'CheckoutDeliveryDetails',

  components: {
    AppTextarea,
    // AppRadio,
    AppInput,
    // AppSelect,
    CheckoutModal
  },

  props: {
    isClarified: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      form: {
        addressSelect: '',
        address: ''
      },

      modalForm: {
        postalCode: '',
        address1: '',
        address2: '',
        comment: '',
        error: ''
      },

      suggestions: [],
      inputRects: {
        x: 0,
        y: 0,
        width: 0
      }
    };
  },

  computed: {
    addressList() {
      return new Array(30).fill({ id: '', label: '' }).map((_, index) => ({
        id: `addr${index}`,
        label: `address ${index}`
      }));
    },

    deliveryDetails() {
      return this.$store.getters['checkout/getCheckout']?.shipping_address ?? {};
    },

    addressText() {
      return this.form.address ? 'Edit' : 'Create';
    },

    suggestionsStyle() {
      return {
        left: `${this.inputRects.x}px`,
        maxWidth: `${this.inputRects.width}px`,
        top: `${this.inputRects.y}px`
      };
    }
  },

  mounted() {
    this.initDeleveryDetails();
  },

  methods: {
    onClickAddressItem(item, close, setLabel) {
      this.form.addressSelect = item.id;
      setLabel(item.label);
      close();
    },

    editAddress(item, close) {
      close();
      this.$refs.addressModal.open();
    },

    initDeleveryDetails() {
      this.form.address = this.$store.getters['checkout/getCheckout']?.shipping_address?.address1 || '';

      Object.keys(this.modalForm).forEach((key) => {
        if (this.deliveryDetails?.[key]) {
          this.modalForm[key] = this.deliveryDetails[key];
        }

        if (key === 'postalCode' && this.deliveryDetails?.postal_code) {
          this.modalForm[key] = this.deliveryDetails.postal_code;
        }
      });
    },

    async saveAddress() {
      if (!this.modalForm.address1) {
        this.modalForm.error = VALIDATE_MESSAGES.required;

        return;
      }

      this.modalForm.error = '';

      const { postalCode, error, ...props } = this.modalForm;

      this.form.address = `${props.address1} ${props.address2}`;

      await this.$store.dispatch('checkout/setCheckoutAddress', {
        ...props,
        postal_code: postalCode,
        full_address: this.form.address
      });

      this.$refs.addressModal.close();
    },

    async getSuggestionsWhenTyping(value) {
      if (value.length < 2) {
        this.suggestions = [];
        return;
      }

      this.suggestions = await woosMapService(value);
    },

    onChooseSuggestion(item) {
      try {
        const splittedAddress = item.description.split(',').map((str) => str.trim());

        const postalCode = splittedAddress[splittedAddress.length - 2];
        const address = splittedAddress.filter((str) => str !== postalCode).join(', ');

        this.modalForm.postalCode = postalCode;
        this.modalForm.address1 = address;
      } catch (error) {
        console.error(error);
      }
    },

    onTypingAddressOrPostalCode(value, field) {
      this.modalForm[field] = value;
      this.getSuggestionsWhenTyping(this.modalForm[field]);
    },

    onInputFocus(e) {
      const GAP_OFFSET = 12;
      const { x, y, width, height } = e.srcElement.parentNode.getBoundingClientRect();
      this.inputRects = { x, y: y + height + GAP_OFFSET, width };
    },

    onInputBlur() {
      this.inputRects.x = 0;
      this.inputRects.y = 0;
      this.inputRects.width = 0;
      this.suggestions = [];
    },

    setComment: debounce(async function (value) {
      if (!value) {
        return;
      }

      await this.$store.dispatch('checkout/setCheckoutAddress', {
        full_address: this.form.address,
        comment: value
      });

      this.form.comment = value;
    }, CHECKOUT_INPUT_DELAY)
  }
};
</script>

<style lang="scss" scoped>
.v-enter-active {
  overflow: hidden;
  animation: show-in 0.5s;
}
.v-leave-active {
  overflow: hidden;
  animation: show-in 0.5s reverse;
}

@keyframes show-in {
  0% {
    opacity: 0;
    height: 0%;
  }
  100% {
    height: 70%;
    opacity: 1;
  }
}

.delivery-details {
  &__note {
    font-family: $golos-regular;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #000000;
    margin-top: 8px;
  }

  &__address {
    margin-top: 16px;
  }

  &__address-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    height: 44px;

    font-family: $golos-regular;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #1f2226;
    user-select: none;
    cursor: default;
  }

  &__address-item-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }

  &__clarify {
    padding-top: 20px;
  }

  &__address-item-right {
    padding: 4px;
  }

  &__commentary {
    margin-top: 8px;
  }

  &__modal-content {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
  }

  &__modal-window-input,
  &__modal-window-textarea,
  &__modal-window-button {
    margin-top: 12px;
  }

  &__modal-window-address {
    display: flex;
    flex-direction: row;

    @include gt-md {
      justify-content: space-between;
    }

    @include lt-lg {
      flex-direction: column;
      align-items: stretch;
    }

    & > .app-input {
      @include gt-md {
        flex: 0 0 calc(50% - 6px);
      }
    }
  }

  &__modal-suggestions {
    position: fixed;
    width: 100%;
    max-height: 140px;
    overflow-y: auto;
    background-color: #fff;
    padding: 0 0 12px;
    margin: 0;
    list-style: none;
    z-index: 10;
    border-radius: 12px;

    &::-webkit-scrollbar {
      display: none;
    }

    &-item {
      font-family: $golos-regular;
      font-size: 14px;
      line-height: 18px;
      border-radius: 8px;
      transition: color 0.2s ease 0s;
      padding: 8px 16px;
      cursor: pointer;
      background-color: #fff;
      position: relative;

      &:hover {
        color: $color-green;
      }

      &:not(:first-child) {
        margin-top: 8px;

        &:before {
          content: '';
          position: absolute;
          top: -4px;
          left: 0;
          right: 0;
          width: calc(100% - 32px);
          margin: 0 auto;
          height: 1px;
          background: rgba($color-white-grey, 0.1);
        }
      }
    }
  }

  &__icon-edit {
    width: 16px;
    height: 16px;
  }

  .error {
    font-family: $golos-regular;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #db1838;
    padding-left: 18px;
    margin-top: 4px;
  }
}
</style>
