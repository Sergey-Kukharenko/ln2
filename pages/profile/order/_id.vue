<template>
  <div class="order">order</div>
</template>

<script>
import Vue from 'vue';

import profile from '~/data/profile';

const { head, list } = profile.pages.orders;
export default Vue.extend({
  name: 'OrderPage',

  layout: 'profile',

  data() {
    return {
      head,
      list
    };
  }
});
</script>
