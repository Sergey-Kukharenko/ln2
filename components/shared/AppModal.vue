<template>
  <AppModalAbstraction
    v-if="visible"
    :theme="theme"
    :center="center"
    :bottom="bottom"
    :inside="inside"
    :icon="icon"
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

    bottom: {
      type: Boolean,
      default: false
    },

    inside: {
      type: Boolean,
      default: false
    },

    icon: {
      type: String,
      default: ''
    }
  },

  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>
