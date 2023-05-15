<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'StripePaymentLayout',

  middleware: ['auth']
};
</script>
