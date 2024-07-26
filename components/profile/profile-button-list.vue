<template>
  <div class="profile-button-list">
    <button
      v-for="button in buttons"
      :key="button.value"
      :class="{ active: button.value === selectedBtn }"
      @click="handleClick(button)"
    >
      <img v-if="button.icon" :src="button.icon" :alt="button.label" />
      {{ button.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProfileButtonList',

  props: {
    buttons: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      selectedBtn: 'prefer_not_say'
    };
  },

  methods: {
    handleClick(button) {
      this.selectedBtn = button.value;
      this.$emit('set-button', button);
    }
  }
};
</script>

<style scoped lang="scss">
.profile-button-list {
  display: flex;
  gap: 6px;
}

button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 10px;
  background: $bg-grey;
  border-radius: 10px;

  &:hover,
  &.active {
    color: #fff;
    background: $color-green;
  }
}
</style>
