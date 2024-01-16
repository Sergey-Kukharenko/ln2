<template>
  <div></div>
</template>

<script>
import stripeMobileStatus from '~/mixins/stripeMobileStatus';

export default {
  name: 'StripeMobileFailStatus',
  mixins: [stripeMobileStatus],
  layout: 'empty',

  data() {
    return {
      status: false
    };
  }
};
</script>
