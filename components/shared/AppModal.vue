<template>
  <AppModalAbstraction v-if="visible" :theme="theme" :center="center" :inside="inside" @close="close">
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
