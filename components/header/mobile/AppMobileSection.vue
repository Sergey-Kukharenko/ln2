<template>
  <div :class="classNames">
    <div v-for="(section, index) in sections" :key="index" class="item">
      <div class="section__header header">
        <div class="header__title">
          {{ section.title }}
        </div>
      </div>
      <div class="section__list list">
        <div v-for="(item, idx) in section.list" :key="idx" class="list__item" @click="$emit('open-menu-item', item)">
          <span>
            {{ item.title }}
          </span>
          <span v-if="item.from" class="text-grey">{{ item.from }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToggleClassName } from '~/helpers';

export default {
  name: 'AppMobileSection',

  props: {
    sections: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      isVisible: true
    };
  },

  computed: {
    classNames() {
      return useToggleClassName(this.isVisible, 'section', 'active');
    },

    isLink() {
      return this.section?.link?.text;
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 20px;
}

.section {
  margin: 17px 0;
  padding: 0 0 18px;

  &__link {
    display: none;
    font-family: $golos-regular;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: $color-dark-green;
    margin: 12px 0 -2px;
  }

  &--active {
    & .header__icon {
      transform: rotate(180deg);
    }

    & .list,
    & .section__link {
      display: block;
    }
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__title {
    font-family: $golos-bold;
    font-size: 14px;
    line-height: 16px;
  }

  &__icon {
    display: block;
    width: 12px;
    height: 16px;
    transition: transform 0.2s ease 0s;
  }
}

.list {
  display: none;
  margin: 5px 0 -6px;

  &__item {
    display: block;
    font-family: $golos-regular;
    font-size: 14px;
    line-height: 20px;
    color: $color-dark-grey;
    padding: 6px 0;
  }
}

.text-grey {
  color: $color-white-grey;
}
</style>
