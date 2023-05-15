<template>
  <checkout-pane title="Date & time" :delim="true">
    <div class="date__tabs" :class="{ fasten }">
      <basket-tab
        ref="dateTab"
        :list="dateList"
        size="large"
        :stretch="true"
        :disabled-tabs="disabledTabs"
        @click="onTabClick"
      >
        <template #default="{ item }">
          <div class="date__tabs-item">
            <div
              v-if="item.title"
              class="date__tabs-item-title"
              :class="{ disabled: isTabDisabled(item) }"
              v-text="item.title"
            />
            <div class="date__tabs-item-label" :style="getDateLabelStyle(item.title)" v-html="getDateLabel(item)" />
          </div>
        </template>
      </basket-tab>
    </div>
    <div class="date__select" :class="{ fasten }">
      <app-select ref="timeSelect" placeholder="Choose delivery time" :list="timeList" size="x-large" dark-label>
        <template #default="{ item, close, setLabel }">
          <div class="date__select-item" @click="onClickTimeItem(item, close, setLabel)">
            <div>
              <app-radio v-model="time" :name="item.id">
                {{ item.label }}
              </app-radio>
            </div>
            <div>{{ showDeliveryPrice(item) }}</div>
          </div>
        </template>
      </app-select>
      <div v-show="error" class="error">
        {{ error }}
      </div>
    </div>
    <!-- <div class="date__fasten">
      <basket-switch v-model="fasten" @change="onChangeDeliveryMode" />
      <div class="date__fasten-group-text">
        <div class="date__fasten-label">Fasten delivery (in 2 hours)</div>
        <div class="date__fasten-price">+ £5</div>
      </div>
    </div> -->
    <checkout-modal ref="dateModal" :width="436" @close="onCloseDayModal">
      <template #title>Choose another day</template>
      <template #default>
        <div class="date__modal-day-list">
          <div
            v-for="(item, index) in dayList"
            :key="index"
            class="date__modal-day-item"
            @click="onClickDayItem(index)"
          >
            <app-radio v-model="daySelectIndex" :name="index" />
            <div class="date__modal-day-label">
              {{ item.month }} {{ item.day }}, <span>{{ item?.weekday }}</span>
            </div>
          </div>
        </div>
      </template>
    </checkout-modal>
  </checkout-pane>
</template>

<script>
import { mapGetters } from 'vuex';
import { format } from 'date-fns';

import AppSelect from '~/components/shared/AppSelect';
import AppRadio from '~/components/shared/AppRadio';

const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default {
  name: 'CheckoutDateTime',

  components: {
    AppRadio,
    AppSelect
  },

  props: {
    error: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      time: 0,
      initializedDate: null,
      daySelectIndex: null,
      fasten: false,
      disabledTabs: []
    };
  },

  computed: {
    ...mapGetters({
      timeList: 'checkout/getCheckoutIntervals'
    }),

    checkoutIntervalDate() {
      return this.$store.getters['checkout/getCheckout']?.interval?.date;
    },

    dayList() {
      const date = new Date();
      date.setDate(date.getDate() + 2);
      let dayCount = 19;
      const result = [];
      while (dayCount--) {
        result.push({
          month: new Intl.DateTimeFormat('en-ES', { month: 'long' }).format(date),
          day: date.getDate(),
          weekday: new Intl.DateTimeFormat('en-ES', { weekday: 'long' }).format(date)
        });
        date.setDate(date.getDate() + 1);
      }
      return result;
    },

    dateList() {
      const date = new Date();
      return [
        {
          type: 'fix',
          title: 'Today',
          label: date
        },
        {
          type: 'fix',
          title: 'Tomorrow',
          label: new Date(new Date(date).setDate(date.getDate() + 1))
        },
        {
          type: 'select',
          title: this.daySelectIndex ? this.dayList[this.daySelectIndex]?.weekday : '',
          label: 'Choose <br /> another day'
        }
      ];
    },

    dateTimeIntervalData() {
      return this.$store.getters['checkout/getCheckout']?.interval;
    },

    isFastenDelivery() {
      return !!this.$store.getters['checkout/getCheckout']?.fast_delivery;
    },

    selectedMonth() {
      return this.dayList[this.daySelectIndex]?.month;
    },

    selectedDay() {
      return this.dayList[this.daySelectIndex]?.day;
    }
  },

  mounted() {
    this.initDateTimeData();
    this.fasten = this.isFastenDelivery;
  },

  methods: {
    showDeliveryPrice(item) {
      const price = item.delivery_amount;

      if (!price) {
        return 'Free delivery';
      }

      return `£ ${price}`;
    },

    getDateLabelStyle(title) {
      if (this.dateList[this.dateList.length - 1].title !== title) {
        return {};
      }

      return {
        color: '#000000'
      };
    },

    isTabDisabled(item) {
      const idx = this.dateList.findIndex((el) => el.label === item.label);

      return this.disabledTabs.includes(idx);
    },

    checkValidTimeIntervals() {
      if (!this.timeList.every((t) => t.disabled)) {
        return;
      }

      const todayIdx = 0;

      this.onTabClick(todayIdx + 1);
      this.disabledTabs.push(todayIdx);
    },

    getDateLabel(item) {
      if (item.type === 'fix') {
        const month = item.label.getMonth();
        const day = item.label.getDate();

        return `${monthList[month]} ${day}`;
      } else if (this.daySelectIndex !== null) {
        return `${this.selectedMonth} ${this.selectedDay}`;
      }

      return item.label;
    },

    async onClickTimeItem(item, close, setLabel) {
      if (!item) {
        return;
      }

      this.time = item.id;
      const price = this.getDeliveryAmoutText(item.delivery_amount);
      await this.setInterval({ time: item.label });
      setLabel(`${item.label}, ${price}`);
      close();
    },

    getDeliveryAmoutText(price) {
      return price ? `£ ${price}` : 'Free delivery';
    },

    async onTabClick(index) {
      if (this.dateList[index].type === 'select') {
        this.$refs.dateModal.open();
      } else {
        this.daySelectIndex = null;
        this.$refs.dateTab.active = index;
        const date = this.formatDate(this.dateList[index].label);

        await this.setInterval({ date });
      }
    },

    onCloseDayModal() {
      if (this.daySelectIndex === null) {
        this.$refs.dateTab.active = 0;
      }
    },

    async onClickDayItem(index) {
      this.daySelectIndex = index;

      await this.$nextTick();

      const date = new Date(`${this.selectedDay} ${this.selectedMonth} ${new Date().getFullYear()}`);
      const formatted = this.formatDate(date);

      this.setInterval({ date: formatted });

      this.$refs.dateModal?.close();
    },

    async initDateTimeData() {
      const time = this.dateTimeIntervalData?.time;
      const date = new Date();
      const checkoutDate = new Date(this.dateTimeIntervalData?.date);
      const actualDate = this.dateTimeIntervalData?.date
        ? this.formatDate(this.dateTimeIntervalData?.date)
        : this.formatDate(date);
      const isToday = this.formatDate(date) === actualDate || !this.dateTimeIntervalData?.date;
      const isTomorrow = date.getDate() + 1 === checkoutDate.getDate();

      if (isToday) {
        this.$refs.dateTab.active = 0;
      } else if (isTomorrow) {
        this.$refs.dateTab.active = 1;
      } else {
        this.$refs.dateTab.active = 2;
        this.daySelectIndex = checkoutDate.getDate() - date.getDate();
      }

      this.initializedDate = actualDate;

      await this.$store.dispatch('checkout/fetchCheckoutIntervals', { intervals_date: actualDate });

      if (!time) {
        this.onClickTimeItem(this.timeList?.[0], this.$refs.timeSelect.close, this.$refs.timeSelect.setLabel);

        return;
      }

      this.$refs.timeSelect.setLabel(time);
      this.time = this.timeList.find((t) => t.label === time)?.id;

      if (!checkoutDate) {
        return;
      }

      this.checkValidTimeIntervals();
    },

    formatDate(date) {
      let formattedDate = date;

      if (typeof date === 'string') {
        formattedDate = new Date(date);
      }

      return format(formattedDate, 'yyyy-MM-dd');
    },

    async onChangeDeliveryMode(status) {
      const { success } = await this.$store.dispatch('checkout/setCheckoutOther', { fast_delivery: status });

      if (success) {
        await this.$store.dispatch('checkout/fetchCheckout');

        return;
      }

      this.fasten = !this.fasten;
    },

    async setInterval(payload) {
      const data = await this.$store.dispatch('checkout/fetchCheckoutIntervals', {
        intervals_date: this.preparePayloadDate(payload?.date)
      });

      const firstInterval = data?.[0];

      await this.$store.dispatch('checkout/setCheckoutInterval', {
        date: this.preparePayloadDate(payload?.date),
        time: payload?.time || firstInterval.label
      });

      if (!payload?.time) {
        const newTimeItem = this.timeList?.[0] ?? firstInterval?.label;
        const price = this.getDeliveryAmoutText(newTimeItem?.delivery_amount);

        this.$refs.timeSelect.setLabel(`${newTimeItem?.label}, ${price}`);
        this.time = newTimeItem?.id;
      }

      this.$store.dispatch('checkout/fetchCheckout');
    },

    preparePayloadDate(payloadDate) {
      return payloadDate || this.checkoutIntervalDate || this.initializedDate;
    }
  }
};
</script>

<style lang="scss" scoped>
.fasten {
  pointer-events: none;
  user-select: none;
  filter: saturate(0);
}

.date {
  &__tabs {
    @include gt-md() {
      margin-top: 24px;
    }

    @include lt-lg {
      margin-top: 12px;
    }
  }

  &__select {
    @include gt-md() {
      margin-top: 28px;
    }

    @include lt-lg() {
      margin-top: 16px;
    }
  }

  &__tabs-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__tabs-item-title {
    font-family: $golos-medium;
    color: $color-dark-grey;

    @include gt-md() {
      font-size: 16px;
      line-height: 20px;
    }

    @include lt-lg() {
      font-size: 12px;
      line-height: 14px;
      letter-spacing: -0.01em;
    }

    &.disabled {
      color: $color-white-grey;
    }
  }

  &__tabs-item-label {
    font-family: $golos-regular;
    color: $color-white-grey;

    @include gt-md() {
      font-size: 14px;
      line-height: 20px;
    }

    @include lt-lg() {
      font-size: 12px;
      line-height: 14px;
      letter-spacing: -0.01em;
    }
  }

  &__select-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 44px;
  }

  &__modal-day-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;

    height: 46px;
    font-family: $golos-regular;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #1f2226;
    user-select: none;
    cursor: default;

    &:not(:last-child) {
      border-bottom: 1.5px solid #dde0e6;
    }
  }

  &__modal-day-label {
    & > span {
      color: #7c7c7c;
    }
  }

  &__fasten {
    display: flex;
    flex-direction: row;
    align-items: center;

    @include gt-md {
      margin-top: 34px;
    }

    @include lt-lg {
      justify-content: space-between;
      margin-top: 16px;
    }

    & .switch {
      @include lt-lg {
        flex-shrink: 0;
        order: 1;
      }
    }
  }

  &__fasten-group-text {
    display: flex;
    align-items: center;

    @include lt-lg {
      order: 0;
      display: block;
      max-width: 188px;
    }
  }

  &__fasten-label {
    font-family: $golos-regular;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #7c7c7c;

    @include gt-sm() {
      margin: 0 8px 0 12px;
    }
  }

  &__fasten-price {
    font-family: $golos-medium;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: $color-dark-grey;
    white-space: nowrap;
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
