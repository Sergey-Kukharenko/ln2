<template>
  <div class="section">
    <div v-if="isTitle" class="section__title">{{ section.title }}</div>

    <div :class="classNames">
      <div v-for="(item, idx) in list" :key="idx" class="list__item">
        <nuxt-link :to="{ name: `${item.prefix}-slug`, params: { slug: item.slug } }" class="container">
          <div v-if="item.icon" class="container__figure">
            <svg-icon :name="item.icon" v-bind="item.style" />
          </div>
          <div class="container__text">
            {{ item.title }}
            <span v-if="item.from" class="text-grey">{{ item.from }}</span>
          </div>
          <app-badge v-if="item.is_best" class="container__badge" theme="orange" size="sm"> best </app-badge>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppBadge from '~/components/shared/AppBadge.vue';
import { useClassNameProp } from '~/helpers';

export default {
  name: 'AppMenuSection',

  components: { AppBadge },

  props: {
    section: {
      type: [Object, Array],
      default: () => []
    },

    theme: {
      type: String,
      default: ''
    }
  },

  computed: {
    isTitle() {
      return !Array.isArray(this.section) && this.section.title;
    },

    classNames() {
      return `${useClassNameProp(this.theme, 'list')} ${this.wrapperClass}`;
    },

    wrapperClass() {
      return !this.section.list ? 'categories' : '';
    },

    list() {
      return Array.isArray(this.section) ? this.section[0] : this.section.list;
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  color: #000000;
  margin: 24px 0 18px;

  &__title {
    font-family: $golos-bold;
    font-size: 16px;
    line-height: 20px;
    padding: 0 16px;
  }
}

.list {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(5, 32px);
  margin: 12px 0;
  position: relative;

  &.categories {
    grid-template-columns: repeat(4, 25%);
  }

  &--md {
    grid-template-rows: repeat(7, 32px);
  }

  &--lg {
    grid-template-rows: repeat(10, 32px);
  }

  &__item {
    display: flex;
    padding: 0 40px 0 16px;
    cursor: pointer;

    &:hover {
      .container {
        transform: translateX(6px);
      }
    }
  }
}

.text-grey {
  color: $color-white-grey;
}

.container {
  display: flex;
  align-items: center;
  transition: transform 0.15s ease 0s;

  &__figure {
    width: 21px;
    height: 21px;
    flex-shrink: 0;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__text {
    flex: 1;
    font-family: $golos-regular;
    font-size: 14px;
    line-height: 20px;
    color: $color-dark-grey;
  }

  &__badge {
    margin-left: 6px;
  }
}

.sections__item {
  &:not(:first-child) {
    .list__item {
      border-left: 1px solid #eaeaea;
    }
  }
}
</style>
