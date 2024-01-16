<template>
  <div class="seo" :class="classes">
    <section v-if="html">
      <div v-html="html" />
    </section>

    <section v-if="isFaq">
      <app-seo-faq :faq="faq" />
    </section>
  </div>
</template>

<script>
import AppSeoFaq from '~/components/seo/AppSeoFaq.vue';

export default {
  name: 'AppSeo',

  components: { AppSeoFaq },

  props: {
    html: {
      type: String,
      default: ''
    },

    faq: {
      type: Array,
      default: () => []
    },

    hasLayout: {
      type: Boolean,
      default: false
    },

    pageTheme: {
      type: String,
      default: ''
    }
  },

  computed: {
    isFaq() {
      return this.faq?.length;
    },

    classes() {
      return {
        'seo--layout': this.hasLayout,
        [`seo--theme-${this.pageTheme}-page`]: this.pageTheme
      };
    }
  }
};
</script>

<style lang="scss">
.seo {
  section {
    &:not(:last-child) {
      @include gt-sm {
        margin-bottom: 48px;
      }

      @include lt-md {
        margin-bottom: 32px;
      }
    }
  }

  a {
    color: $color-green;
    text-decoration: underline;
  }

  h2 {
    font-family: $Literata;
    font-style: normal;
    font-weight: 700;

    @include gt-sm {
      font-size: 28px;
      line-height: 32px;
      margin: 48px 0 24px;
    }

    @include lt-md {
      font-size: 20px;
      line-height: 24px;
      margin: 32px 0 16px;
    }
  }

  p,
  li {
    font-family: $golos-regular;
    color: $color-dark-grey;

    @include gt-sm {
      font-size: 16px;
      line-height: 24px;
    }

    @include lt-md {
      font-size: 11px;
      line-height: 16px;
    }
  }

  div {
    & > p {
      &:first-child {
        @include gt-sm {
          font-size: 18px;
          line-height: 24px;
          margin: 0 0 48px 0;
        }

        @include lt-md {
          font-size: 14px;
          line-height: 18px;
          margin: 0 0 32px 0;
        }
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    position: relative;

    @include gt-sm {
      padding-left: 24px;
    }

    @include lt-md {
      padding-left: 16px;
    }

    &:before {
      content: '';
      background: $color-dark-grey;
      border-radius: 50%;
      position: absolute;

      @include gt-sm {
        width: 4px;
        height: 4px;
        top: 10px;
        left: 8px;
      }

      @include lt-md {
        width: 2px;
        height: 2px;
        top: 6px;
        left: 4px;
      }
    }
  }

  &--layout {
    margin: 0 auto;

    @include gt-md {
      max-width: 1080px;
    }

    @include lt-md {
      padding: 12px;
    }
  }

  &--theme-home-page {
    margin-top: -24px;

    div {
      & > p {
        &:first-child {
          @include gt-sm {
            font-size: 16px;
            line-height: 24px;
          }

          @include lt-md {
            font-size: 11px;
            line-height: 16px;
            letter-spacing: -0.01em;
          }
        }
      }
    }
  }
}
</style>
