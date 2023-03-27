<template>
  <div class="cookies">
    <div class="layout layout--horizontal">
      <div class="cookies-container">
        <div class="card">
          <div class="figure">
            <img src="/images/cookies/cookies.png" class="figure__image" alt="cookies" />
          </div>
          <div class="figcaption">
            <div class="figcaption-container">
              <div class="figcaption-container__title">Our cookie usage</div>
              <div class="figcaption-container__text">
                By clicking ACCEPT, you agree with our
                <a href="/files/cookies-policy.pdf" target="_blank" class="link">Cookie Policy</a> and
                <a href="/files/privacy-policy.pdf" target="_blank" class="link">Privacy Policy</a>
              </div>
            </div>
            <app-button theme="yellow-whitely" size="x-lg" class="cookies-button" @click="setCookies"
              >Accept</app-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/shared/AppButton.vue';

export default {
  name: 'AppCookies',

  components: { AppButton },

  methods: {
    setCookies() {
      this.$emit('setCookies');
    }
  }
};
</script>

<style scoped lang="scss">
.cookies {
  display: flex;
  align-items: center;
  padding: 12px 0;
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 4;
  background: #fff3d9;
  border-radius: 16px;

  & .layout {
    width: 100%;
  }

  & .layout--horizontal {
    padding: 0 12px;
  }
}

.card {
  display: flex;
  align-items: center;
}

.figure {
  flex-shrink: 0;
  overflow: hidden;

  @include gt-sm {
    width: 76px;
    height: 76px;
  }

  @include lt-md {
    width: 48px;
    height: 48px;
  }

  &__image {
    display: block;
    width: 100%;
  }
}

.figcaption {
  flex: 1;

  @include gt-sm {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 16px;
  }

  @include lt-md {
    margin-left: 9px;
  }
}

.figcaption-container {
  &__title {
    font-family: $Literata;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: $color-dark-grey;

    @include gt-sm {
      font-size: 20px;
      line-height: 24px;
    }

    @include lt-md {
      font-size: 14px;
      line-height: 24px;
    }
  }

  &__text {
    font-family: $golos-regular;
    letter-spacing: -0.01em;
    color: $color-dark-grey;

    @include gt-sm {
      max-width: 362px;
      font-size: 14px;
      line-height: 20px;
      margin-top: 4px;
    }

    @include lt-md {
      font-size: 11px;
      line-height: 16px;
      margin-bottom: 12px;
    }
  }
}

.link {
  color: #009859;
}

.cookies-button {
  flex-shrink: 0;
}
</style>
