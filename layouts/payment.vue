<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'PaymentLayout',

  middleware: ['auth']
};
</script>
