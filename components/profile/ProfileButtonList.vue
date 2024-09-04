<template>
  <div class="profile-button-list">
    <button
      v-for="item in list"
      :key="item.value"
      :class="{ active: item.value === selected }"
      @click="handleClick(item.value)"
    >
      <img v-if="item.icon" :src="item.icon" :alt="item.label" />
      {{ item.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProfileButtonList',

  props: {
    list: {
      type: Array,
      default: () => []
    },

    selected: {
      type: String,
      default: ''
    }
  },

  methods: {
    handleClick(value) {
      this.$emit('set-item', value);
    }
  }
};
</script>

<style scoped lang="scss">
.profile-button-list {
  display: flex;
  gap: 6px;

  @include lt-md {
    flex-wrap: wrap;
  }
}

button {
  display: flex;
  align-items: center;
  gap: 10px;

  background: $bg-grey;
  border-radius: 10px;

  @include gt-sm {
    padding: 14px 8px;
  }

  @include lt-md {
    padding: 8px;
    min-height: 52px;
  }

  @include lt-md {
    justify-content: center;

    &:not(:last-child) {
      flex: 1;
    }

    &:last-child {
      width: 100%;
    }
  }

  &:hover,
  &.active {
    color: #fff;
    background: $color-green;
  }
}
</style>
