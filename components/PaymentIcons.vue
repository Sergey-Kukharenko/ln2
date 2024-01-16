<template>
  <div class="payment-icons">
    <div v-for="icon in icons" :key="icon.name" class="item">
      <svg-icon :name="icon.name" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentIcons',

  props: {
    icons: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
.payment-icons {
  display: flex;
  justify-content: flex-end;
  flex: 1;
  gap: 8px;

  @include lt-md {
    display: none;
  }
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 28px;
  border-radius: 12px;
  background: #f7f7f7;
}

.icon {
  max-width: 80%;
  height: 18.48px;
}
</style>
