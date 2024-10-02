<template>
  <AppModalAbstraction
    v-if="visible"
    :theme="theme"
    :center="center"
    :align-items="alignItems"
    :inside="inside"
    @close="close"
  >
    <slot />
  </AppModalAbstraction>
</template>

<script>
import AppModalAbstraction from '@/components/shared/AppModalAbstraction.vue';

export default {
  name: 'AppModal',

  components: {
    AppModalAbstraction
  },

  props: {
    visible: {
      type: Boolean,
      required: true
    },

    theme: {
      type: String,
      default: ''
    },

    center: {
      type: Boolean,
      default: false
    },

    alignItems: {
      type: String,
      default: '',
      validate(value) {
        return ['', 'end'].includes(value);
      }
    },

    inside: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>
