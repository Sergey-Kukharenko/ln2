<template>
  <div class="leaves">
    <cart-switch :value="value" @change="onChange" />
    <div>Add green leaves for £2</div>
  </div>
</template>

<script>
import CartSwitch from '~/components/CartSwitch.vue';

export default {
  name: 'CartProductLeaves',

  components: { CartSwitch },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  emits: ['change'],

  methods: {
    onChange() {
      this.$emit('change', !this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.leaves {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  font-family: $golos-regular;
  font-size: 14px;
  line-height: 20px;
  margin-top: 16px;

  @include lt-lg {
    flex-direction: row-reverse;
    justify-content: space-between;

    font-size: 12px;
    line-height: 16px;
  }
}
</style>
