<template>
  <div class="header">
    <div v-if="char" class="header__char">{{ char }}</div>
    <div class="header__info">{{ userName }}</div>
  </div>
</template>

<script>
export default {
  name: 'AppProfileHeader',

  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    char() {
      return this.user?.name?.substring(0, 1);
    },

    userName() {
      return this.user.name || 'No name';
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  @include gt-sm {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px 20px;
    border-bottom: 1px solid #dde0e6;
  }

  @include lt-md {
    display: none;
  }

  &__char {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    font-family: $golos-bold;
    font-size: 24px;
    line-height: 32px;
    color: #fff;
    background: #e8929d;
    border-radius: 50%;
  }

  &__info {
    flex: 1;
    font-family: $golos-regular;
    font-size: 16px;
    line-height: 24px;
    margin-left: 12px;
  }
}
</style>
