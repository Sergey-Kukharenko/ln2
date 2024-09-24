<template>
  <div class="calendar calendar__wrapper">
    <div class="calendar__title">
      Choose another date
      <div class="calendar__close" @click="$emit('close')">
        <svg-icon name="close" class="calendar__close-icon" />
      </div>
    </div>
    <div class="calendar__navigation">
      <div class="calendar__navigation-prev" @click="prevMonth">
        <svg-icon name="arrow-left" class="calendar__navigation-icon" />
      </div>
      <div class="calendar__navigation-value">{{ getMonthAndYear }}</div>
      <div class="calendar__navigation-next" @click="nextMonth">
        <svg-icon name="arrow-left" class="calendar__navigation-icon" />
      </div>
    </div>
    <div class="calendar__weekdays">
      <div v-for="dayName in $options.DAYS_OF_WEEK" :key="dayName" class="calendar__weekdays-item">
        {{ dayName }}
      </div>
    </div>
    <div :key="currDate.month" class="calendar__days">
      <div
        v-for="item in daysList"
        :key="item"
        class="calendar__days-item"
        :class="{ disabled: checkDisabledDay(item), today: checkSelected(item) }"
        @click="selectDate(item)"
      >
        <div class="calendar__days-item--box">
          {{ item }}
        </div>
        <div v-show="item" class="calendar__days-item--price-label">{{ getPriceLabel(item) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ONE_DIGIT_DAY_MONTH_LIMIT } from '~/constants';
import { useDeepCopyObject, useFormattedDateForBackend } from '~/helpers';
import { sortByDeliveryAmount } from '~/store/checkout';

const FIRST_MONTH = 0;
const LAST_MONTH = ONE_DIGIT_DAY_MONTH_LIMIT + 1;
const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export default {
  name: 'CheckoutCalendar',

  props: {
    todayDate: {
      type: Date,
      default: new Date()
    },

    currCheckoutDate: {
      type: Date,
      default: new Date()
    },

    intervalList: {
      type: Array,
      default: () => []
    }
  },

  DAYS_OF_WEEK,

  data() {
    return {
      currDate: {
        year: this.currCheckoutDate.getFullYear(),
        month: this.currCheckoutDate.getMonth(),
        day: this.currCheckoutDate.getDate()
      }
    };
  },

  computed: {
    getMonthAndYear() {
      return `${MONTHS[this.currDate.month]} ${this.currDate.year}`;
    },

    lastDayOfMonth() {
      return new Date(this.currDate.year, this.currDate.month + 1, 0).getDate();
    },

    daysList() {
      const daysList = [];

      const firstDayOfMonth = new Date(this.currDate.year, this.currDate.month, 1);

      const offset = DAYS_OF_WEEK.indexOf(
        new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(firstDayOfMonth)
      );
      const limit = this.lastDayOfMonth;

      for (let i = 0; i < offset; i++) {
        daysList.push(null);
      }

      for (let i = 1; i <= limit; i++) {
        daysList.push(i);
      }

      return daysList;
    },

    hasSelectedDay() {
      return this.currDate.day !== this.todayDate.getDate();
    },

    payloadDate() {
      const month =
        this.currDate.month + 1 < ONE_DIGIT_DAY_MONTH_LIMIT ? `0${this.currDate.month + 1}` : this.currDate.month + 1;
      return { year: this.currDate.year, month, day: this.lastDayOfMonth };
    },

    isCurrentMonth() {
      return this.todayDate.getMonth() === this.currDate.month;
    }
  },

  methods: {
    nextMonth() {
      if (this.currDate.month === LAST_MONTH) {
        this.currDate.month = FIRST_MONTH;
        this.currDate.year = this.currDate.year + 1;
      } else {
        this.currDate.month = this.currDate.month + 1;
      }
    },

    prevMonth() {
      if (this.currDate.month === FIRST_MONTH) {
        this.currDate.month = LAST_MONTH;
        this.currDate.year = this.currDate.year - 1;
      } else {
        this.currDate.month = this.currDate.month - 1;
      }
    },

    checkDisabledDay(day) {
      const isDayDisabled = !this.intervalList?.find((el) => el?.date === this.formatDateForBackend(day))?.intervals
        ?.length;

      return isDayDisabled;
    },

    checkSelected(day) {
      return this.currCheckoutDate.getMonth() === this.currDate.month && day === this.currCheckoutDate.getDate();
    },

    getPriceLabel(day) {
      const formattedDate = this.formatDateForBackend(day);
      const intervalDay = this.intervalList.find((el) => el?.date === formattedDate);
      const copiedIntervalDay = useDeepCopyObject(intervalDay);
      const sortedTimeIntervals = copiedIntervalDay?.intervals?.sort(sortByDeliveryAmount);
      const result = {
        min: sortedTimeIntervals?.[0]?.delivery_amount || 0,
        max: sortedTimeIntervals?.[sortedTimeIntervals.length - 1]?.delivery_amount || 0
      };
      const { min, max } = result;

      return min === max ? `£${min}` : `£${min} - £${max}`;
    },

    formatDateForBackend(day) {
      return useFormattedDateForBackend(new Date(this.currDate.year, this.currDate.month, day));
    },

    selectDate(day) {
      const LIMIT = 10;
      const selectedDay = day < LIMIT ? `0${day}` : day;
      const selectedMonth = this.currDate.month + 1 < LIMIT ? `0${this.currDate.month + 1}` : this.currDate.month + 1;
      const result = `${this.currDate.year}-${selectedMonth}-${selectedDay}`;

      this.$emit('select-date', result);
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  &__wrapper {
    padding: 0 12px;

    @include lt-lg {
      padding: 12px;
    }
  }

  &__title {
    font-family: $golos-medium;
    color: $color-dark-grey;

    @include gt-sm {
      font-size: 24px;
      font-weight: 600;
      line-height: 28px;
      letter-spacing: 0.01em;
      text-align: center;
    }

    @include lt-lg {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
    }
  }

  &__close {
    @include gt-sm {
      display: none;
    }

    @include lt-lg {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      user-select: none;
      border-radius: 50%;
      background: rgb(124, 124, 124, 12%);

      &-icon {
        width: 16px;
        height: 16px;
        color: #7c7c7c;
      }
    }
  }

  &__navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin: 24px auto;

    &-value {
      width: 130px;
      font-family: $golos-medium;
      font-size: 16px;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: 0em;
      color: $color-dark-green;
      user-select: none;
      text-align: center;
    }

    &-icon {
      width: 16px;
      height: 16px;
      fill: $color-dark-green;
      user-select: none;

      @include gt-sm {
        cursor: pointer;
      }
    }

    &-next {
      transform: rotate(180deg);
    }
  }

  &__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 12px;

    &-item {
      font-family: $golos-regular;
      font-size: 13px;
      font-weight: 600;
      line-height: 18px;
      letter-spacing: -0.08px;
      user-select: none;
      text-align: center;
    }
  }

  &__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    &-item {
      text-align: center;
      height: 52px;
      user-select: none;

      @include gt-sm {
        cursor: pointer;
      }

      &--price-label {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0 4px;
        width: fit-content;
        height: 16px;
        border-radius: 4px;
        font-family: $golos-regular;
        font-size: 10px;
        line-height: 12px;
        letter-spacing: -0.02em;
        background: #f2f2f7;
        margin: 4px auto;
      }

      &.disabled {
        color: #7c7c7c;
        pointer-events: none;
      }

      &.disabled &--price-label {
        display: none;
      }

      &.today &--box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: #e5ffea;
        margin: 0 auto;
        color: $color-dark-green;
        position: relative;
        top: -6.5px;
        border-radius: 6px;
      }

      &.today &--price-label {
        position: relative;
        top: -14px;
        background: #009959;
        color: #fff;
      }
    }
  }
}
</style>
