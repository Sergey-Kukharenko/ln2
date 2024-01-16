<template>
  <div></div>
</template>

<script>
import stripeMobileStatus from '~/mixins/stripeMobileStatus';

export default {
  name: 'StripeMobileSuccessStatus',
  mixins: [stripeMobileStatus],
  layout: 'empty',

  data() {
    return {
      status: true
    };
  }
};
</script>
