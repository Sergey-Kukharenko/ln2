<template>
  <div class="checkout-intervals">
    <transition>
      <checkout-intervals-group
        v-show="!isClarified"
        :list="intervalsGroupDetails"
        @set-interval-type="handleIntervalType"
      />
    </transition>
    <checkout-modal-select
      v-if="isIntervalsModalVisible"
      title="Choose delivery time"
      @close-modal="onIntervalsModalToggle"
    >
      <template #default>
        <checkout-current-intervals
          :list="currIntervals"
          :time.sync="interval.time"
          @set-time-interval="onClickTimeInterval"
        />
      </template>
    </checkout-modal-select>
    <checkout-modal-select v-if="isCalendarModalVisible" theme="centered" @close-modal="closeCalendarModal">
      <checkout-calendar
        :today-date="useGetDateByTimeZone(todayDate)"
        :curr-checkout-date="checkoutIntervalDate"
        :interval-list="getIntervals"
        @select-date="selectDate"
        @close="closeCalendarModal"
      />
    </checkout-modal-select>
    <transition>
      <div v-show="!isClarified" class="checkout-intervals__delivery-text delivery-text">
        <div class="delivery-text__row">Same day delivery from £8</div>
        <div class="delivery-text__row">
          Next day delivery starts from <span class="delivery-text__free">Free</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';

import CheckoutCurrentIntervals from '~/components/checkout/CheckoutCurrentIntervals.vue';
import CheckoutIntervalsGroup from '~/components/checkout/CheckoutIntervalsGroup.vue';
import { useFormattedDateForBackend, useGetDateByTimeZone } from '~/helpers';
import { INTERVAL_VALIDATE_MESSAGES } from '~/messages/index';
import { accessorMapper } from '~/store';

const findFirstAvailableDay = (arr) => {
  return arr.find((day) => !!day?.intervals.filter((interval) => !interval?.disabled).length);
};

export default Vue.extend({
  name: 'CheckoutIntervals',

  components: {
    CheckoutIntervalsGroup,
    CheckoutCurrentIntervals,
    CheckoutModalSelect: () => import('~/components/checkout/CheckoutModalSelect.vue'),
    CheckoutCalendar: () => import('~/components/checkout/CheckoutCalendar.vue')
  },

  props: {
    isClarified: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      interval: {
        date: null,
        time: null
      },

      selectedInterval: 0,

      isIntervalsModalVisible: false,
      isCalendarModalVisible: false,

      errors: {
        date: '',
        time: ''
      }
    };
  },

  computed: {
    ...accessorMapper('checkout', ['checkoutCost', 'todayDate', 'getIntervals']),

    deliveryLabel() {
      return +this.checkoutCost.deliveryCost ? `+ ${+this.checkoutCost.deliveryCost}£` : 'Free';
    },

    currIntervals() {
      const targetDate = useFormattedDateForBackend(this.checkoutIntervalDate);

      return this.getIntervals
        ?.find((day) => day?.date === targetDate)
        ?.intervals?.filter((interval) => !interval?.disabled);
    },

    timeIntervalLabel() {
      if (!this.checkoutIntervalData?.time) {
        return '';
      }

      if (this.interval.time) {
        return this.interval.time;
      }

      const checkoutOrderInterval =
        this.currIntervals?.intervals?.find((interval) => interval?.label === this.checkoutIntervalData?.time) ??
        this.firstAvalibleIterval;

      return checkoutOrderInterval?.label;
    },

    dateIntervalLabel() {
      if (!this.checkoutIntervalData?.date) {
        return '';
      }

      const date = this.checkoutIntervalDate;

      const weekday = new Intl.DateTimeFormat('en-ES', { weekday: 'long' }).format(date);
      const day = date.getDate();
      const month = new Intl.DateTimeFormat('en-ES', { month: 'long' }).format(date);

      return `${weekday}, ${day} ${month}`;
    },

    checkoutIntervalData() {
      return this.$accessor.checkout.getCheckout?.interval;
    },

    checkoutIntervalDate() {
      return useGetDateByTimeZone(this.checkoutIntervalData?.date ?? this.firstAvalibleDay?.date);
    },

    firstAvalibleDay() {
      return findFirstAvailableDay(this.getIntervals);
    },

    firstAvalibleIterval() {
      return this.firstAvalibleDay?.intervals?.find((interval) => !interval.disabled) || '';
    },

    intervalsGroupDetails() {
      return [
        {
          type: 'delivery',
          title: 'For delivery on',
          value: this.dateIntervalLabel,
          default: 'Choose the date',
          error: this.errors.date
        },
        {
          type: 'time',
          title: 'Time',
          value: this.timeIntervalLabel,
          delivery: this.deliveryLabel,
          default: 'Choose the time',
          error: this.errors.time
        }
      ];
    }
  },

  watch: {
    isClarified() {
      // TODO: Убираем для C версии, если попадет в А версию, удалить этот блок кода
      // if (!val) {
      //   const time =
      //     this.checkoutIntervalData?.time ?? this.firstAvalibleIterval?.label;
      //   this.setInterval({ date: null, time });

      //   return;
      // }

      this.setInterval({ date: null, time: null, clear: true });
    }
  },

  mounted() {
    this.$nuxt.$on('set-intervals', this.initSelectedIntervals);
    this.$nuxt.$on('set-interval-validation-error', this.setIntervalValidationError);

    // Перенос данных ab, временно комментируем старый функционал
    // if (this.isABTesting) {
    //   return;
    // }

    // await this.$nextTick();

    // if (this.checkoutIntervalData?.time) {
    //   this.interval.time = this.checkoutIntervalData?.time;

    //   return;
    // }

    // const payload = {
    //   date: null,
    //   time: this.firstAvalibleIterval?.label
    // };

    // this.setInterval(payload);
  },

  beforeDestroy() {
    this.$nuxt.$off('set-intervals', this.initSelectedIntervals);
    this.$nuxt.$off('set-interval-validation-error', this.setIntervalValidationError);
  },

  methods: {
    setIntervalValidationError() {
      this.errors.date = !this.checkoutIntervalData.date ? INTERVAL_VALIDATE_MESSAGES.date : '';
      this.errors.time = !this.checkoutIntervalData.time ? INTERVAL_VALIDATE_MESSAGES.time : '';
    },

    openCalendarModal() {
      this.isCalendarModalVisible = true;
    },

    closeCalendarModal() {
      this.isCalendarModalVisible = false;
    },

    onClickTimeInterval(item) {
      this.setInterval({ date: null, time: item?.label });
      this.onIntervalsModalToggle();
    },

    onIntervalsModalToggle() {
      if (!this.checkoutIntervalData.date) {
        this.errors.date = INTERVAL_VALIDATE_MESSAGES.date;

        return;
      }

      this.isIntervalsModalVisible = !this.isIntervalsModalVisible;

      const NOSCROLL_CLASS = 'noscroll';

      if (this.isIntervalsModalVisible) {
        document.body.classList.add(NOSCROLL_CLASS);

        return;
      }

      document.body.classList.remove(NOSCROLL_CLASS);
    },

    handleIntervalType(type) {
      type === 'delivery' ? this.openCalendarModal() : this.onIntervalsModalToggle();
    },

    async initSelectedIntervals() {
      const intervals = await this.$accessor.checkout.fetchIntervals();

      if (!this.dateIntervalLabel) {
        return;
      }

      const avalibleDate = intervals.find((el) => !!el.intervals.length)?.date;
      const avalibleIntervalDate = useGetDateByTimeZone(avalibleDate);
      const payloadDate =
        (avalibleIntervalDate.getDate() > this.checkoutIntervalDate.getDate() &&
          avalibleIntervalDate.getMonth() === this.checkoutIntervalDate.getMonth()) ||
        avalibleIntervalDate.getMonth() > this.checkoutIntervalDate.getMonth()
          ? avalibleDate
          : this.checkoutIntervalData?.date;

      this.selectDate(payloadDate);
    },

    selectDate(date) {
      try {
        // Временно скрыт в рамках задачи MFS-1175
        // const foundIntervalDay = this.getIntervals.find((day) => day.date === date);
        // const intervalDay = foundIntervalDay || this.firstAvalibleDay;
        // const [firstInterval] = intervalDay?.intervals;
        // const time = firstInterval?.label || this.timeIntervalLabel;
        this.closeCalendarModal();
        this.setInterval({ date });
      } catch (err) {
        console.error(err);
      }
    },

    async setInterval({ date = null, time = null, clear = false }) {
      try {
        if (clear) {
          this.interval.date = null;
          this.interval.time = null;
          this.errors.date = '';
          this.errors.time = '';

          await this.$accessor.checkout.setCheckoutInterval({
            date: null,
            time: null
          });

          return;
        }

        const isDateNotExist = !date && this.checkoutIntervalDate;

        if (isDateNotExist) {
          date = useFormattedDateForBackend(this.checkoutIntervalDate);
        }
        this.interval.time = time;

        await this.$accessor.checkout.setCheckoutInterval({ date, time });
        this.$accessor.checkout.fetchCheckout();

        this.errors.date = '';
        this.errors.time = '';
      } catch (err) {
        console.error(err);
      }
    },

    useGetDateByTimeZone,
    useFormattedDateForBackend
  }
});
</script>

<style lang="scss">
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
    height: 0;
  }
  100% {
    height: 70%;
    opacity: 1;
  }
}

.checkout-intervals {
  width: 100%;

  .delivery-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8px;

    &__row {
      font-family: $golos-regular;
      letter-spacing: -0.02em;
      text-align: center;

      @include gt-sm {
        font-size: 16px;
        line-height: 18px;
      }

      @include lt-lg {
        font-size: 14px;
        line-height: 17px;
      }
    }

    &__free {
      font-family: $golos-medium;
      font-weight: 600;
    }
  }
}
</style>
