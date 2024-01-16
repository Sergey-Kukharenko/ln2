<template>
  <div class="list">
    <div v-for="(item, idx) in list" :key="idx" class="list__item" @click="handleClick(idx, item)">
      <div class="group-content">
        <div class="figure">
          <svg-icon v-if="item.icon" :name="item.icon" class="figure__icon" :class="item.icon" />
        </div>
        <div class="figcaption">{{ item.title }}</div>
      </div>
      <div v-if="item.count" class="count">
        <span class="count__number">{{ item.count }}</span>
      </div>
    </div>
    <!--Временно скрыт-->
    <!--<div class="list__item" @click="goToFavorite">-->
    <!--  <div class="group-content">-->
    <!--    <div class="figure">-->
    <!--      <svg-icon name="mom" class="figure__icon" />-->
    <!--    </div>-->
    <!--    <div class="figcaption">Favorite</div>-->
    <!--  </div>-->
    <!--</div>-->
  </div>
</template>
<script>
export default {
  name: 'AppMobileMenu',

  inject: ['closeMenu'],

  props: {
    list: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    handleClick(idx, item) {
      if (item.to) {
        this.closeMenu();

        this.$nextTick().then(() => {
          this.$router.push(item.to);
        });
      }

      if (!item.prefix && !item.slug) {
        this.$emit('selectItem', idx);

        return;
      }

      this.closeMenu();

      this.$nextTick().then(() => {
        this.$router.push({ name: `${item.prefix}-slug`, params: { slug: item.slug } });
      });
    },

    goToFavorite() {
      this.closeMenu();

      this.$nextTick().then(() => {
        this.$router.push({ name: 'favorites' });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 0 6px;
  }
}

.group-content {
  display: flex;
  align-items: center;
  color: $color-dark-grey;
}

.figure {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 18px;
  height: 18px;

  &__icon {
    width: 16px;
    height: 16px;

    &.relatives {
      width: 18px;
      height: 18px;
    }
  }
}

.figcaption {
  font-family: $golos-regular;
  font-size: 12px;
  line-height: 16px;
  margin-left: 10px;
}

.count {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f63866;
  border-radius: 50%;

  &__number {
    font-family: $golos-medium;
    font-size: 9px;
    line-height: 12px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
}
</style>
