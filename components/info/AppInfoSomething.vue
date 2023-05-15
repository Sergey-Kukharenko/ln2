<template>
  <div class="layout something" :class="className">
    <div class="something__top">
      <h2 class="something__title">
        {{ content.title }}
      </h2>
      <p class="something__text">{{ content.text }}</p>
    </div>

    <div class="something__cards">
      <app-info-card v-for="(card, index) in content.columns" :key="index" :number="index + 1" :theme="theme">
        <template #link>
          <a v-if="card.link" :href="card.link.url" class="card__link">{{ card.link.text }}</a>
          <app-info-social-list v-if="card.social" :list="card.social" />
        </template>
        <template #title>
          <h3 class="card__title">{{ card.title }}</h3>
        </template>
        <template #text>
          <p class="card__text">{{ card.text }}</p>
        </template>
      </app-info-card>
    </div>
  </div>
</template>

<script>
import AppInfoCard from '~/components/info/AppInfoCard';
import AppInfoSocialList from '~/components/info/AppInfoSocialList';

export default {
  name: 'AppInfoSomething',

  components: {
    AppInfoSocialList,
    AppInfoCard
  },

  props: {
    theme: {
      type: String,
      default: '',
      validate(value) {
        return ['extended'].includes(value);
      }
    },

    content: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    className() {
      return {
        [`something--${this.theme}`]: this.theme
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.something {
  display: flex;
  flex-direction: column;

  @include gt-sm {
    gap: 52px;
  }

  @include lt-md {
    gap: 24px;
  }

  &__top {
    display: flex;
    flex-direction: column;

    @include gt-sm {
      gap: 24px;
    }

    @include lt-md {
      gap: 12px;
    }
  }

  &__title {
    margin: 0;
    font-family: $Literata;
    font-style: normal;
    font-weight: 700;
    color: $color-dark-grey;

    @include gt-sm {
      font-size: 48px;
      line-height: 70px;
    }

    @include lt-md {
      font-size: 20px;
      line-height: 24px;
      letter-spacing: -0.01em;
    }
  }

  &__text {
    margin: 0;
    font-family: $golos-regular;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: $color-dark-grey;

    @include gt-sm {
      width: 50%;
      white-space: pre-wrap;
    }
  }

  &__cards {
    display: flex;

    @include gt-sm {
      gap: 24px;
    }

    @include lt-md {
      flex-direction: column;
      gap: 16px;
    }

    .card {
      &__title {
        margin: 0;
        font-family: $golos-medium;
        font-style: normal;
        font-weight: 600;
        color: $color-dark-grey;

        @include gt-sm {
          font-size: 20px;
          line-height: 24px;
          white-space: pre-wrap;
        }

        @include lt-md {
          font-size: 16px;
          line-height: 20px;
        }
      }

      &__text {
        margin: 0;
        font-family: $golos-regular;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.01em;
        color: $color-dark-grey;

        @include gt-sm {
          white-space: pre-wrap;
        }
      }
    }
  }

  &--extended {
    &__top {
      display: flex;
      flex-direction: column;

      @include gt-sm {
        gap: 24px;
      }

      @include lt-md {
        gap: 3px;
      }
    }

    &__title {
      margin: 0;
      font-family: $Literata;
      font-style: normal;
      font-weight: 700;
      color: $color-dark-grey;

      @include gt-sm {
        font-size: 48px;
        line-height: 70px;
      }

      @include lt-md {
        font-size: 20px;
        line-height: 24px;
        letter-spacing: -0.01em;
      }
    }

    &__text {
      margin: 0;
      font-family: $golos-regular;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.01em;
      color: $color-dark-grey;

      @include gt-sm {
        width: 50%;
        white-space: pre-wrap;
      }
    }

    .something__cards {
      display: flex;

      @include gt-sm {
        gap: 24px;
      }

      @include lt-md {
        flex-direction: column;
        gap: 16px;
      }

      .card {
        &__link {
          display: block;
          font-family: $golos-bold;
          color: $color-dark-green;

          @include gt-sm {
            font-size: 20px;
            line-height: 24px;
            margin-bottom: 16px;
          }

          @include lt-md {
            font-size: 16px;
            line-height: 20px;
            margin-bottom: 12px;
          }
        }

        &__title {
          margin: 0;
          font-family: $golos-medium;
          font-style: normal;
          font-weight: 600;
          color: $color-dark-grey;

          @include gt-sm {
            font-size: 16px;
            line-height: 20px;
          }

          @include lt-md {
            display: none;
          }
        }

        &__text {
          font-family: $golos-regular;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.01em;
          color: $color-dark-grey;

          @include gt-sm {
            margin-top: 8px;
            white-space: pre-wrap;
          }
        }

        &__content {
          background: #26ad4f;
          @include gt-sm {
            gap: 0;
          }

          @include lt-md {
            gap: 12px;
          }
        }
      }
    }
  }
}
</style>
