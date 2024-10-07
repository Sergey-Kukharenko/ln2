<template>
  <div class="item-switch" :class="classes">
    <app-switch :value="value" :disabled="disabled" @change="onChange" />
    <div>{{ label }}</div>
    <slot />
  </div>
</template>

<script>
import AppSwitch from '~/components/shared/switch/AppSwitch.vue';

export default {
  name: 'AppItemSwitch',

  components: { AppSwitch },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    label: {
      type: String,
      default: ''
    },

    direction: {
      type: String,
      default: 'row',
      validate(value) {
        return ['row', 'reverse'].includes(value);
      }
    },

    background: {
      type: String,
      default: '',
      validate(value) {
        return ['grey'].includes(value);
      }
    },

    justifyContent: {
      type: String,
      default: 'flex-start',
      validate(value) {
        return ['flex-start', 'space-between'].includes(value);
      }
    }
  },

  emits: ['change'],

  computed: {
    classes() {
      return {
        [`item-switch--direction-${this.direction}`]: this.direction,
        [`item-switch--background-${this.background}`]: this.background,
        [`item-switch--${this.justifyContent}`]: this.justifyContent
      };
    }
  },

  methods: {
    onChange() {
      this.$emit('change', !this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.item-switch {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 16px 12px;
  border-radius: 12px;

  font-family: $golos-regular;
  font-size: 14px;

  @include gt-sm {
    line-height: 20px;
  }

  @include lt-md {
    //flex-direction: row-reverse;
    justify-content: space-between;
    line-height: 18px;
    padding: 16px;
  }

  &--direction-row {
    flex-direction: row;
  }

  &--direction-reverse {
    flex-direction: row-reverse;
  }

  &--background-grey {
    background: $bg-grey;
  }

  &--flex-start {
    justify-content: flex-start;
  }

  &--space-between {
    justify-content: space-between;
  }
}
</style>
