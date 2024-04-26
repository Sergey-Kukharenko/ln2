<template>
  <div class="footer-main">
    <div class="layout-footer layout--horizontal-dt">
      <div class="footer-container container">
        <div class="email-form">
          <app-best-offer rounded-top />
        </div>
        <div class="group">
          <div class="group__logo">
            <svg-icon name="logo" class="group__logo-icon" />
          </div>
          <div class="group__text">{{ footer.mode }}</div>
          <div class="group__email">
            <app-email-button :email="footer.email" />
          </div>
        </div>
        <div class="group-lists">
          <div v-for="(section, idx) in footer.sections" :key="idx" class="group-lists__item">
            <app-footer-section :section="section" />
          </div>
        </div>
        <div class="group-feedback">
          <div class="group-feedback__email-form">
            <app-best-offer />
          </div>
          <app-footer-feedback :contacts="footer.contacts" :email="footer.email" />
        </div>
        <div class="group--mobile">
          <div class="group--mobile__logo">
            <svg-icon name="logo" class="group--mobile__logo-icon" />
          </div>
          <div class="group--mobile__text">{{ footer.mode }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import AppFooterFeedback from '@/components/footer/AppFooterFeedback.vue';
import AppFooterSection from '@/components/footer/AppFooterSection.vue';
import AppEmailButton from '@/components/shared/AppEmailButton.vue';
import AppBestOffer from '~/components/AppBestOffer.vue';
import { accessorMapper } from '~/store';

export default Vue.extend({
  name: 'AppFooterContainer',

  components: {
    AppBestOffer,
    AppFooterSection,
    AppFooterFeedback,
    AppEmailButton
  },

  computed: {
    ...accessorMapper('layout', ['footer'])
  }
});
</script>

<style scoped lang="scss">
.footer-main {
  @include gt-sm {
    border-bottom: 1px solid #e5e5e5;
  }
}

.layout-footer {
  max-width: 1190px;
  margin: 0 auto;
}

.footer-container {
  @include gt-sm {
    display: flex;
    justify-content: space-between;
    padding: 48px 0 24px;
    gap: 64px;
  }

  @include lt-md {
    padding: 0 0 22px;
  }
}

.email-form {
  @include gt-sm {
    display: none;
  }

  @include sm {
    max-width: 252px;
    margin: 0 auto;
  }
}

.group {
  position: relative;

  @include lt-md {
    display: none;
  }

  @include sm {
    max-width: 260px;
    margin: 0 auto;
  }

  @include xs {
    max-width: 212px;
    text-align: center;
    padding: 30px 0;
    margin: 0 auto;
  }

  &--mobile {
    @include gt-sm {
      display: none;
    }

    display: flex;
    flex-direction: column;
    gap: 18px;
    max-width: 70%;
    margin: 0 auto;
    padding-top: 32px;

    &__logo {
      display: flex;
      justify-content: center;
    }

    &__logo-icon {
      width: 116.16px;
      height: 25.89px;
    }

    &__text {
      font-family: $golos-regular;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      letter-spacing: 0.01em;
      color: $color-dark-grey;
    }
  }

  &__logo {
    @include gt-xs {
      margin-top: 7px;
    }
  }

  &__logo-icon {
    @include gt-xs {
      width: 133.96px;
      height: 29.97px;
    }
  }

  &__text {
    font-family: $golos-regular;

    @include gt-xs {
      max-width: 214px;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.01em;
      margin-top: 15px;
    }

    @include lt-md {
      display: none;
    }
  }

  &__email {
    position: absolute;
    bottom: 0;

    @include lt-md {
      display: none;
    }
  }
}

.group-feedback {
  @include gt-sm {
    flex-basis: 252px;
  }

  @include sm {
    max-width: 252px;
    margin: 16px auto 0;
  }

  &__email-form {
    @include lt-md {
      display: none;
    }
  }
}

.group-lists {
  display: flex;

  @include gt-sm {
    flex: 1;
    gap: 50px;
  }

  @include sm {
    max-width: 482px;
    margin: 16px auto 0;
  }

  @include xs {
    display: block;
  }

  // &__item:last-child {
  //   display: none;
  // }
}
</style>
