<template>
  <section class="layout discount" :class="className">
    <div class="discount__panel">
      <div class="discount__panel-col info">
        <div class="info__title">{{ info.title }}</div>
        <div class="info__text">
          {{ info.description }}
        </div>
      </div>
      <div class="discount__panel-col form">
        <input v-model="email" class="form__input" placeholder="Your Email" />
        <button class="form__button">Subscribe</button>
      </div>
    </div>
    <div v-if="isDefaultTheme" class="blur"></div>
  </section>
</template>

<script>
export default {
  name: 'AppDiscount',

  props: {
    info: {
      type: Object,
      default: () => ({})
    },

    theme: {
      type: String,
      default: 'default',
      validate(value) {
        return ['default', 'subscribe'].includes(value);
      }
    }
  },

  data() {
    return {
      email: ''
    };
  },

  computed: {
    className() {
      return {
        [`discount--theme-${this.theme}`]: true
      };
    },

    isDefaultTheme() {
      return this.theme === 'default';
    }
  }
};
</script>

<style lang="scss" scoped>
.discount {
  position: relative;

  &__panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    background: #fffce0 url('~/assets/sprite/svg/gift-bg.svg') no-repeat 297px 8px;
    box-shadow: 0 6px 16px rgba(51, 51, 50, 0.08);
    border-radius: 24px;

    @include gt-sm {
      padding: 24px 42px 24px 32px;
    }

    @include lt-md {
      padding: 16px;
      gap: 16px;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 8px;

    @include gt-sm {
      width: 296px;
    }

    &__title {
      font-family: $golos-bold;

      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0.01em;
      color: #000000;
    }

    &__text {
      font-family: $golos-regular;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.01em;
      color: #000000;
    }
  }

  .form {
    display: flex;
    align-items: center;
    gap: 8px;

    @include lt-md {
      flex-wrap: wrap;
    }

    &__input {
      border: none;
      outline: none;
      box-sizing: border-box;
      background: #fff;
      color: $color-dark-grey;
      border-radius: 10px;
      font-family: $golos-regular;
      font-style: normal;

      padding: 0 16px;
      height: 52px;

      @include gt-sm {
        font-size: 14px;
        line-height: 20px;
      }

      @include lt-md {
        font-size: 12px;
        line-height: 16px;
        letter-spacing: -0.02em;
      }

      @include gt-sm {
        width: 350px;
      }

      &::placeholder {
        font-family: $golos-regular;
        font-style: normal;
        font-size: 14px;
        line-height: 20px;
        color: $color-white-grey;
      }
    }

    &__button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 52px;
      font-family: $golos-medium;
      padding: 0 12px;
      transition: background-color 0.2s ease 0s;
      color: #000000;
      background: #ffcd1e;
      font-size: 15px;

      @include gt-sm {
        width: 184px;
        line-height: 24px;
        border-radius: 12px;
      }

      @include lt-md {
        width: 100%;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: -0.01em;
      }

      &:hover:not(:disabled) {
        background: #ffcd1e;
        box-shadow: 2px 4px 7px darken(#ffcd1e, 10%);
        cursor: pointer;
      }

      &:active:not(:disabled) {
        box-shadow: 0 0 0 $bg-grey;
      }

      &:disabled {
        background: #ccc;
        cursor: none;
      }
    }
  }

  .blur {
    position: absolute;
    z-index: 1;
    width: 922px;
    height: 116px;
    left: 79px;
    top: 35px;

    background: #ffcd1e;
    opacity: 0.3;
    filter: blur(62px);
    border-radius: 24px;
  }

  &--theme-default {
    @include lt-md {
      display: none;
    }
  }

  &--theme-subscribe {
    box-shadow: none;

    &.layout {
      @include gt-sm {
        padding: 0;
      }

      @include lt-md {
        padding: 0;
      }
    }

    .discount__panel {
      border: 1px solid #ffe6ae;
      border-radius: 16px;
      box-shadow: none;

      @include gt-sm {
        background: #fffce0 url('~/assets/sprite/svg/news.svg') no-repeat calc(50% - 165px) calc(50% - 16px);
        padding: 24px;
      }

      @include lt-md {
        background: #fffce0 url('~/assets/sprite/svg/news-mobile.svg') no-repeat 100% calc(0% - 1px);
      }
    }

    .info {
      &__title {
        font-family: $Literata;
        font-style: normal;
        font-weight: 700;
        letter-spacing: -0.01em;

        @include gt-sm {
          font-size: 24px;
          line-height: 29px;
        }

        @include lt-md {
          font-size: 20px;
          line-height: 24px;
        }
      }

      &__text {
        @include gt-sm {
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.01em;
        }

        @include lt-md {
          font-size: 12px;
          line-height: 16px;
          letter-spacing: -0.02em;
        }
      }
    }

    .form {
      &__input {
        height: 44px;
        padding: 13px 24px;
        border-radius: 12px;

        @include gt-sm {
          width: 364px;
        }

        @include lt-md {
          width: 100%;
        }
      }

      &__button {
        height: 44px;
        color: #fff;
        background: #ffc33d;
        border-radius: 12px;

        @include gt-sm {
          width: 228px;
        }

        @include lt-md {
          width: 100%;
        }
      }
    }
  }
}
</style>
