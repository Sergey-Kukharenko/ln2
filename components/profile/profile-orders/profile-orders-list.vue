<template>
  <div class="profile-orders-list">
    <profile-orders-item v-for="item in filteredList" :key="item.id" :item="item" />
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileOrdersItem from '~/components/profile/profile-orders/profile-orders-item.vue';

export default Vue.extend({
  name: 'ProfileOrdersList',
  components: { ProfileOrdersItem },

  props: {
    list: {
      type: Array,
      default: () => []
    },

    preview: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    filteredList() {
      return this.preview ? [this.list[0]] : this.list;
    }
  }
});
</script>

<style scoped lang="scss">
.profile-orders-list {
  display: flex;
  flex-direction: column;

  @include gt-sm {
    gap: 8px;
  }

  @include lt-md {
    gap: 10px;
  }
}
</style>
