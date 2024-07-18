<template>
  <div class="list" :class="classes">
    <div v-for="(item, idx) in list" :key="idx" class="list__item" @click="onChange(item, idx)">
      <div class="card" :class="{ active: idx === selectedItemIndex }">
        <div class="card__figure figure">
          <div v-if="item.is_recommended" class="badge">
            <img src="/icons/smile.png" alt="fire" class="badge__icon" />
          </div>
          <img :src="getImage(item.image)" class="figure__img" :alt="item.image" />
        </div>
        <div v-if="item.price >= 0" class="card__figcaption figcaption">{{ item.title }} £ {{ item.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { CONSTRUCTOR_PACKAGE_COOKIE } from '~/constants';
import { useSizedImage } from '~/helpers';

const IMG_SIZE = 60;

export default {
  name: 'AppList',

  props: {
    list: {
      type: Array,
      default: () => []
    },

    theme: {
      type: String,
      default: 'default',
      validate(value) {
        return ['default', 'advanced'].includes(value);
      }
    },

    activeColor: {
      type: String,
      default: ''
    }
  },

  IMG_SIZE,

  data() {
    return {
      selectedItemIndex: this.getSelectedItemIndex()
    };
  },

  computed: {
    classes() {
      return {
        [`list--theme-${this.theme}`]: true
      };
    }
  },

  methods: {
    useSizedImage,

    getSelectedItemIndex() {
      const target = this.activeColor || this.$cookies.get(CONSTRUCTOR_PACKAGE_COOKIE);
      const idx = this.list.findIndex((c) => c.id === target);
      return idx !== -1 ? idx : 0;
    },

    onChange(item, idx) {
      this.selectedItemIndex = idx;
      this.$emit('setItem', item);
    },

    getImage(imagePath) {
      // return useSizedImage({ name: imagePath, width: this.$options.IMG_SIZE, height: this.$options.IMG_SIZE });
      return `${process.env.baseUrl}/${imagePath}`;
    }
  }
};
</script>

<style scoped lang="scss">
.list {
  display: flex;
  user-select: none;

  @include gt-sm {
    margin: 4px -8px;
  }

  @include lt-sm {
    padding: 3px 0 0 0;
    overflow: hidden;
    overflow-x: auto;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &--theme-advanced {
    & .card {
      &__figure {
        margin: 0 auto;

        @include gt-sm {
          width: 74px;
          height: 74px;
        }

        @include lt-md {
          width: 56px;
          height: 56px;
        }
      }
    }

    & .figure {
      &:before {
        display: block;
      }

      &:after {
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border: 2.5px solid $color-green;
      }
    }
  }

  &__item {
    @include gt-sm {
      margin: 4px 8px;
    }

    @include lt-md {
      margin: 8px 5px;

      &:first-child {
        margin-left: 14px;
      }

      &:last-child {
        margin-right: 14px;
      }
    }
  }
}

.card {
  &__figure {
    position: relative;
    z-index: 1;
    border-radius: 12px;

    @include gt-sm {
      width: 60px;
      height: 60px;
      cursor: pointer;
    }

    @include lt-md {
      width: 56px;
      height: 56px;
    }
  }

  &__figcaption {
    margin-top: 11px;
  }

  &:hover {
    @include gt-sm {
      .card__figcaption {
        color: $color-dark-grey;
      }

      .figure__img {
        transform: scale(0.98);
      }

      .figure {
        &:before {
          opacity: 0;
          transform: scale(0.9);
        }

        &:after {
          opacity: 1;
          transform: scale(1);
        }
      }
    }
  }

  &.active {
    .card__figcaption {
      color: $color-dark-grey;
    }

    .figure__img {
      transform: scale(0.98);
    }

    .figure {
      &:before {
        opacity: 0;
        transform: scale(0.9);
      }

      &:after {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  &:active {
    .figure__img {
      transform: scale(0.86);
    }
  }
}

.figure {
  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease-out 0s;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    z-index: 2;
    border-radius: 12px;
    transition: opacity 0.3s ease 0s, border 0.3s ease 0s, transform 0.3s ease-out 0s;
  }

  &:before {
    display: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #eaeaea;
    transform: scale(1);
  }

  &:after {
    display: block;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 2.5px solid $color-green;
    opacity: 0;
    transform: scale(1.1);
  }
}

.figcaption {
  font-size: 12px;
  line-height: 130%;
  letter-spacing: -0.24px;
  color: $color-white-grey;
  text-align: center;
}

.badge {
  width: 24px;
  height: 24px;
  position: absolute;
  top: -8px;
  right: -8px;
  z-index: 3;
  background: #ffeec6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__icon {
    display: block;
    width: 14px;
  }
}
</style>
