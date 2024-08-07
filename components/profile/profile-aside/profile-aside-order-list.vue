<template>
  <div class="profile-aside-order-list">
    <div class="head">
      <div class="title" @click="visibility = !visibility">
        {{ getItems }}
        <svg-icon name="arrow-grey" :class="{ active: visibility }" />
      </div>
      <div class="price">
        {{ contents.price }}
      </div>
    </div>

    <div v-show="visibility" class="list">
      <div v-for="item in contents.list" :key="item.id" class="item">
        <img :src="item.img" alt="item.title" />
        <div class="tiltle">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileAsideOrderList',

  props: {
    contents: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      visibility: false
    };
  },

  computed: {
    getItemsWord() {
      return this.contents.list.length > 1 ? ' items' : ' item';
    },

    getItemsCount() {
      return this.contents.list.length;
    },

    getItems() {
      return this.getItemsCount + this.getItemsWord;
    }
  }
};
</script>

<style scoped lang="scss">
.profile-aside-order-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: $golos-regular;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: $color-white-grey;
  cursor: pointer;
}

.icon {
  width: 14px;
  height: 14px;

  &.active {
    transform: rotate(-180deg);
  }
}

.price {
  font-family: $golos-medium;
  font-size: 14px;
  line-height: 20px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item {
  display: flex;
  align-items: center;
  gap: 8px;
}

img {
  width: 48px;
  height: 48px;
  border-radius: 12px;
}

.title {
  max-width: 200px;
  color: $color-dark-grey;
  font-family: $golos-regular;
  font-size: 14px;
  letter-spacing: -0.01em;
  line-height: 20px;
}
</style>
