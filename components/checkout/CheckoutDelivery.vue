<template>
  <div class="delivery-details">
    <transition>
      <div v-show="!isClarified" class="delivery-details__address">
        <div class="delivery-details__search-box" :class="{ active: isSuggestionsExist }">
          <app-input
            :value="addressForm.address1"
            autocomplete="chrome-off"
            :placeholder="searchInputPlaceholder"
            size="xx-large"
            class="delivery-details__address-input"
            @input="onTypingAddress"
            @focus="onInputFocus"
            @blur="onInputBlur"
          >
            <template #right>
              <svg-icon
                v-show="isSearchIconVisible"
                class="delivery-details__address-input--icon search-icon"
                name="search-grey"
              />
              <svg-icon
                v-show="isSearchCloseIconVisible"
                class="delivery-details__address-input--icon close-icon"
                name="close"
                @mousedown="onSearchCloseClick"
              />
            </template>
          </app-input>
          <div v-if="addressForm.error" class="error" v-text="addressForm.error" />
        </div>
        <div class="delivery-details__address-container">
          <ul v-if="isSuggestionsExist" class="delivery-details__suggestions">
            <li
              v-for="hit in suggestions"
              :key="hit.id"
              class="delivery-details__suggestions-item"
              @mousedown="onChooseSuggestion(hit)"
              v-text="hit.suggestion"
            ></li>
            <li
              v-show="isManualBtnVisible"
              class="delivery-details__suggestions-item add-address-manualy"
              @mousedown="onManualModeClick"
            >
              <div class="delivery-details__suggestions-item-iconbox">
                <svg-icon class="delivery-details__suggestions-item-icon" name="pencil-green" />
              </div>
              {{ $options.ADDRESS_MANUALLY_TEXT }}
            </li>
          </ul>
        </div>
        <div v-if="isManualModeLinkVisible" class="delivery-details__address-mode" @click="onManualModeClick">
          {{ $options.ADDRESS_MANUALLY_TEXT }}
        </div>
        <div v-if="manualMode" class="delivery-details__address-mode" @click="onSearchModeClick">
          {{ $options.ADDRESS_SEARCH_TEXT }}
        </div>
        <transition>
          <div v-if="isFullAddressFormVisible" class="delivery-details__extra-fields">
            <app-input
              :value="addressForm.address2"
              autocomplete="chrome-off"
              placeholder="Address line 2"
              size="xx-large"
              class="delivery-details__address-input"
              @input="prepareManualForm($event, 'address2')"
              @focus="onMinorInputFocus($event, 'address2')"
              @blur="onMinorInputBlur"
            >
              <template #right>
                <svg-icon
                  v-show="getCloseIconVisibility('address2')"
                  class="delivery-details__address-input--icon close-icon"
                  name="close"
                  @mousedown="onClearField('address2')"
                />
              </template>
            </app-input>
            <app-input
              :value="addressForm.postalCode"
              autocomplete="chrome-off"
              placeholder="Postcode"
              size="xx-large"
              class="delivery-details__address-input"
              @input="prepareManualForm($event, 'postalCode')"
              @focus="onMinorInputFocus($event, 'postalCode')"
              @blur="onMinorInputBlur"
            >
              <template #right>
                <svg-icon
                  v-show="getCloseIconVisibility('postalCode')"
                  class="delivery-details__address-input--icon close-icon"
                  name="close"
                  @mousedown="onClearField('postalCode')"
                />
              </template>
            </app-input>
            <app-input
              :value="addressForm.comment"
              autocomplete="chrome-off"
              placeholder="Comment for courier"
              size="xx-large"
              class="delivery-details__address-input"
              @input="saveAddress($event, 'comment')"
              @focus="onMinorInputFocus($event, 'comment')"
              @blur="onMinorInputBlur"
            >
              <template #right>
                <svg-icon
                  v-show="getCloseIconVisibility('comment')"
                  class="delivery-details__address-input--icon close-icon"
                  name="close"
                  @mousedown="onClearField('comment')"
                />
              </template>
            </app-input>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import Vue from 'vue';

import { idealPostcodesDetail, idealPostcodesList } from '@/services/idealPostcodesService';
import AppInput from '~/components/shared/AppInput.vue';
import {
  ADDRESS_MANUALLY_TEXT,
  ADDRESS_SEARCH_TEXT,
  CHECKOUT_INPUT_DELAY,
  CHECK_ADDRESS_ERROR_DELAY,
  SEARCH_INPUT_PLACEHOLDER
} from '~/constants';
import { LOCATION_NOT_FOUND_MESSAGE } from '~/messages';
import { accessorMapper } from '~/store';

const isSuggestionsOptimizationEnabled = process.env.addressSuggestionsOptimization === 'true';
const isExistAddress = (address = '', input = '') => {
  address = address.toLowerCase();
  input = input.toLowerCase();

  return address.includes(input);
};

export default Vue.extend({
  name: 'CheckoutDelivery',

  components: {
    AppInput
  },

  props: {
    isClarified: {
      type: Boolean,
      default: false
    }
  },

  ADDRESS_MANUALLY_TEXT,
  ADDRESS_SEARCH_TEXT,

  data() {
    return {
      addressForm: {
        postalCode: '',
        address1: '',
        address2: '',
        longitude: '',
        latitude: '',
        city: '',
        comment: '',
        error: ''
      },

      isManualBtnVisible: false,
      manualMode: false,

      suggestions: [],
      hadSuggestions: false,

      focusedFieldName: '',
      isSearchInputFocused: false,

      inputRects: {
        x: 0,
        y: 0,
        width: 0
      }
    };
  },

  computed: {
    ...accessorMapper('checkout', ['checkoutShippingAddress']),

    fullAddress() {
      return `${this.addressForm.address1}, ${this.addressForm.address2}, ${this.addressForm.postalCode}`;
    },

    isFullAddressFormVisible() {
      return this.manualMode || this.addressForm.postalCode;
    },

    isSuggestionsExist() {
      return this.suggestions.length && !this.manualMode;
    },

    isSearchCloseIconVisible() {
      return this.addressForm.address1 && this.isSearchInputFocused && this.$device.isMobileOrTablet;
    },

    isManualModeLinkVisible() {
      return !this.manualMode;
    },

    searchInputPlaceholder() {
      return this.manualMode ? SEARCH_INPUT_PLACEHOLDER.manual : SEARCH_INPUT_PLACEHOLDER.search;
    },

    isSearchIconVisible() {
      return !this.addressForm.address1 && !this.manualMode;
    },

    existAddressOrPostalCode() {
      return this.addressForm.address1 || this.addressForm.postalCode;
    }
  },

  watch: {
    isClarified(val) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { error, ...fields } = this.addressForm;

      if (Object.values(fields).every((el) => !el) || val) {
        return;
      }

      this.saveAddress();
    }
  },

  mounted() {
    this.initDeleveryDetails();
  },

  methods: {
    onMinorInputFocus(_, field) {
      this.focusedFieldName = field;
    },

    onMinorInputBlur() {
      this.focusedFieldName = '';
    },

    getCloseIconVisibility(field) {
      return !!this.addressForm[field] && this.focusedFieldName === field;
    },

    async onClearField(field) {
      this.addressForm[field] = '';
      await this.saveAddress();
    },

    onSearchCloseClick() {
      this.addressForm.address1 = '';
      this.suggestions = [];
      this.isManualBtnVisible = false;
      this.saveAddress();
    },

    onSearchModeClick() {
      this.isManualBtnVisible = true;
      this.manualMode = false;
      this.addressForm.address1 = '';
    },

    onManualModeClick() {
      this.isManualBtnVisible = false;
      this.manualMode = true;
      this.addressForm.address1 = '';
      this.addressForm.address2 = '';
      this.addressForm.postalCode = '';
      this.addressForm.latitude = '';
      this.addressForm.longitude = '';
      this.addressForm.city = '';
      this.suggestions = [];

      this.saveAddress();
    },

    initDeleveryDetails() {
      Object.keys(this.addressForm).forEach((key) => {
        if (this.checkoutShippingAddress?.[key]) {
          this.addressForm[key] = this.checkoutShippingAddress[key];
        }

        if (key === 'postalCode' && this.checkoutShippingAddress?.postal_code) {
          this.addressForm[key] = this.checkoutShippingAddress.postal_code;
        }
      });
    },

    prepareManualForm: debounce(async function (value, field) {
      this.addressForm[field] = value;

      const existFieldsPayload = Object.entries(this.addressForm)
        .map(([key, value]) => value && key)
        .filter((field) => !!field);

      const [firstHit] = (this.existAddressOrPostalCode && (await idealPostcodesList(existFieldsPayload))) || [];

      if (!firstHit?.id) {
        this.saveAddress(value, field);

        return;
      }

      await this.onChooseSuggestion(firstHit);
    }, CHECKOUT_INPUT_DELAY),

    onTypingAddress: debounce(async function (value) {
      this.addressForm.address1 = value;

      if (this.manualMode) {
        this.prepareManualForm();

        return;
      }

      this.isManualBtnVisible = true;

      if (isSuggestionsOptimizationEnabled && isExistAddress(this.checkoutShippingAddress?.full_address, value)) {
        return;
      }

      await this.getSuggestionsWhenTyping(value);
      this.saveAddress();
    }, CHECKOUT_INPUT_DELAY),

    async getSuggestionsWhenTyping(value) {
      this.addressForm.error = '';

      if (!value.length) {
        this.suggestions = [];

        return;
      }

      this.suggestions = await idealPostcodesList(value);
      // this.checkAndSetSearchError();

      if (!this.hadsuggestions && this.suggestions.length) {
        this.hadSuggestions = true;
      }
    },

    checkAndSetSearchError: debounce(function () {
      if (!this.addressForm.address1) {
        this.addressForm.error = '';
        return;
      }

      this.addressForm.error = this.isSuggestionsExist ? '' : LOCATION_NOT_FOUND_MESSAGE;
    }, CHECK_ADDRESS_ERROR_DELAY),

    async onChooseSuggestion({ id }) {
      try {
        this.suggestions = [];
        this.hadSuggestions = false;
        this.addressForm.error = '';

        // eslint-disable-next-line camelcase
        const { line_1 = '', line_2, line_3, postcode, county, longitude, latitude } = await idealPostcodesDetail(id);
        // eslint-disable-next-line camelcase
        const line2 = line_2 ? line_2 + ', ' : '';
        // eslint-disable-next-line camelcase
        const line3 = line_3 ? line_3 + ', ' : '';

        this.addressForm.address1 = `${line3}${line2}${county}`;
        // eslint-disable-next-line camelcase
        this.addressForm.address2 = line_1;
        this.addressForm.postalCode = postcode;
        this.addressForm = {
          ...this.addressForm,
          longitude,
          latitude,
          city: county
        };

        await this.saveAddress();
      } catch (error) {
        console.error(error);
      }
    },

    scrollToSearchInput() {
      if (!this.$device.isMobileOrTablet) {
        return;
      }

      window.scrollTo({
        top: document.getElementById('delivery-details')?.offsetTop - 60,
        behavior: 'smooth'
      });
    },

    onInputFocus(e) {
      const GAP_OFFSET = 12;
      const SCROLL_TO_DELAY = 100;
      const { x, y, width, height } = e.srcElement.parentNode.getBoundingClientRect();
      this.inputRects = { x, y: y + height + GAP_OFFSET, width };
      this.isSearchInputFocused = true;
      setTimeout(() => {
        this.scrollToSearchInput();
      }, SCROLL_TO_DELAY);
    },

    onInputBlur() {
      this.isSearchInputFocused = false;

      if (this.$device.isMobileOrTablet) {
        return;
      }

      this.inputRects.x = 0;
      this.inputRects.y = 0;
      this.inputRects.width = 0;
      this.suggestions = [];

      this.isManualBtnVisible = false;
    },

    saveAddress: debounce(async function (value, field) {
      if (field) {
        this.addressForm[field] = value;
      }

      if (this.manualMode) {
        this.addressForm.longitude = null;
        this.addressForm.latitude = null;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { postalCode, error, ...fields } = this.addressForm;

      await this.$accessor.checkout.setCheckoutAddress({
        ...fields,
        postal_code: postalCode,
        full_address: this.fullAddress
      });

      this.$nuxt.$emit('set-intervals');
    }, CHECKOUT_INPUT_DELAY)
  }
});
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
  &__address-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    height: 44px;

    font-family: $golos-regular;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: $color-dark-grey;
    user-select: none;
    cursor: default;
  }

  &__search-box {
    margin-top: 16px;

    .delivery-details__address-input {
      margin-top: 0;
    }

    &.active {
      border-radius: 12px 12px 0 0;
      border: 1px solid $bg-grey;
      border-bottom: none;
    }
  }

  &__suggestions {
    position: absolute;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background-color: #fff;
    padding: 10px 0 0 0;
    margin: 0;
    list-style: none;
    z-index: 3;
    border: 1px solid #f7f7f7;
    border-top: none;
    border-radius: 0 0 10px 10px;
    box-sizing: border-box;

    @include lt-md {
      max-height: 220px;
    }

    &::-webkit-scrollbar {
      display: none;
    }

    &-item {
      font-family: $golos-regular;
      font-size: 14px;
      line-height: 20px;
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

      &.add-address-manualy {
        @include lt-md {
          position: sticky;
          bottom: 0;
        }

        display: flex;
        gap: 12px;
        font-family: $golos-medium;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        align-items: center;
        letter-spacing: -0.01em;
        color: $color-green;
        padding: 8px 16px;
      }

      &-iconbox {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 24px;
        height: 24px;
        background: $bg-green;
        border-radius: 6px;
      }

      &-icon {
        width: 16px;
        height: 16px;
      }
    }
  }

  &__address {
    display: flex;
    flex-direction: row;

    @include gt-md {
      flex-direction: column;
    }

    @include lt-lg {
      flex-direction: column;
      align-items: stretch;
    }

    &-container {
      position: relative;
    }

    & > .app-input {
      @include gt-md {
        flex: 0 0 calc(50% - 6px);
      }
    }

    &-input--icon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      cursor: pointer;

      &.search-icon {
        @include gt-sm {
          width: 20px;
          height: 20px;
        }
      }

      &.close-icon {
        @include gt-sm {
          display: none;
        }

        width: 24px;
        height: 24px;
      }
    }

    &-input,
    &-textarea,
    &-button {
      margin-top: 12px;
    }

    &-mode {
      font-family: $golos-regular;
      font-size: 12px;
      line-height: 15.6px;
      letter-spacing: -0.24px;
      cursor: pointer;
      padding: 4px 0 0 18px;
      color: $color-green;
    }
  }

  .error {
    font-family: $golos-regular;
    font-size: 12px;
    line-height: 16px;
    color: #db1838;
    padding-left: 18px;
    margin-top: 4px;
  }
}
</style>
