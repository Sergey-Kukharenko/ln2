<template>
  <div class="banner">
    <div class="banner__content">
      <div class="banner__title">Download the MyFlowers mobile app</div>
      <div class="banner__text">
        <div>Track your order and delivery time</div>
        <div>Open access to exclusive promotions</div>
        <div class="banner__text--bold">Scan a QR - code</div>
      </div>
      <button class="banner__button">Download</button>

      <div class="banner__badges">
        <img src="/images/payment-badges/apple-store-badge.png" alt="Apple Store" />
        <img src="/images/payment-badges/google-play-badge.png" alt="Google Play" />
      </div>
    </div>
    <div class="banner__qr-code">
      <img src="/images/qr-code.png" alt="QR" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthDownloadMobileApp'
};
</script>

<style lang="scss" scoped>
.banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ebfaf0;
  border-radius: 24px;
  box-sizing: border-box;

  @include gt-sm {
    width: 450px;
    height: 150px;
    padding: 18px 16px;
    background-image: url('/images/iphone-14-pro-1.png');
    background-repeat: no-repeat;
    background-position: 192px 18px;
  }

  @include lt-md {
    width: 100%;
    height: 172px;
    padding: 12px;
    background-image: url('/images/iphone-14-pro-2.png');
    background-repeat: no-repeat;
    background-position: 100% 18px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;

    @include gt-sm {
      width: 193px;
    }

    @include lt-md {
      width: 100%;
      max-width: 191px;
    }
  }

  &__qr-code {
    @include lt-md {
      display: none;
    }
  }

  &__title {
    font-family: $golos-medium;
    font-weight: 600;
    letter-spacing: -0.02em;

    @include gt-sm {
      font-size: 16px;
      line-height: 19.2px;
      width: 193px;
    }

    @include lt-md {
      font-size: 14px;
      line-height: 16.8px;
      max-width: 169px;
    }
  }

  &__text {
    font-family: $golos-regular;
    font-weight: 400;
    letter-spacing: -0.02em;

    @include gt-sm {
      font-size: 12px;
      line-height: 15.6px;

      &--bold {
        font-family: $golos-regular;
        font-weight: 600;
        font-size: 12px;
        line-height: 15.6px;
        color: #06ad5d;
        letter-spacing: -0.02em;
      }
    }

    @include lt-md {
      font-size: 10px;
      line-height: 13px;

      &--bold {
        display: none;
      }
    }
  }

  &__button {
    @include gt-sm {
      display: none;
    }

    @include lt-md {
      outline: none;
      border: none;
      height: 32px;
      width: 100%;
      background-color: #007aff;
      border-radius: 12px;
      font-family: $golos-regular;
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      color: #fff;
    }
  }

  &__badges {
    @include gt-sm {
      display: none;
    }

    @include lt-md {
      display: flex;
      gap: 6px;
    }
  }
}
</style>
