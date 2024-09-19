<template>
  <div class="datepicker">
    <client-only>
      <VueDatePicker
        v-model="date"
        format="DD.MM.YYYY"
        :color="color"
        :min-date="availableDates.minDate"
        :max-date="availableDates.maxDate"
        @onChange="onDatepickerChange"
      >
        <template #activator>
          <div ref="activator" class="datepicker__block" :class="{ 'datepicker__block--not-filled': !date }">
            {{ formattedDate }}
          </div>
        </template>
      </VueDatePicker>
    </client-only>
    <div v-show="error" class="datepicker__error">{{ error }}</div>
  </div>
</template>

<script>
import { format } from 'date-fns';

const VueDatePicker = () =>
  Promise.all([
    import('@mathieustan/vue-datepicker'),
    import('@mathieustan/vue-datepicker/dist/vue-datepicker.min.css')
  ]).then(([{ VueDatePicker }]) => VueDatePicker);

export default {
  name: 'AppDatepicker',

  components: {
    VueDatePicker
  },

  props: {
    format: {
      type: String,
      default: 'DD.MM.YYYY'
    },

    placeholder: {
      type: String,
      default: ''
    },

    color: {
      type: String,
      default: '#26ad4f'
    },

    error: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      date: null
    };
  },

  computed: {
    datepickerPlaceholder() {
      return this.placeholder || this.defaultPlaceholder;
    },

    defaultPlaceholder() {
      return this.$device.isMobileOrTablet ? 'Date, month, year' : 'DD/MM/YY';
    },

    availableDates() {
      const date = new Date();

      return {
        minDate: `${date.getFullYear() - 100}-${date.getMonth()}-${date.getDate()}`,
        maxDate: `${date.getFullYear() - 18}-${date.getMonth()}-${date.getDate()}`
      };
    },

    formattedDate() {
      return this.date ? format(new Date(this.date), 'dd.MM.yyyy') : this.datepickerPlaceholder;
    }
  },

  methods: {
    onDatepickerChange() {
      this.$emit('change', this.formattedDate);
    }
  }
};
</script>

<style lang="scss" scoped>
.datepicker {
  &__block {
    width: 100%;
    height: 52px;
    box-sizing: border-box;
    padding: 16px;
    color: $color-dark-grey;
    background: #f7f7f7;
    border-radius: 12px;
    font-family: $golos-regular;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.01em;

    &--not-filled {
      color: $color-white-grey;
    }
  }

  &__error {
    font-family: $golos-regular;
    font-size: 12px;
    line-height: 16px;
    color: #db1838;
    padding-left: 18px;
    margin-top: 4px;

    .error-list {
      margin: 0;
      padding-left: 18px;
    }
  }
}
</style>
