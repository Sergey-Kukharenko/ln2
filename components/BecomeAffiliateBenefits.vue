<template>
  <div class="layout become-affiliate-benefits">
    <div class="become-affiliate-benefits__title">Our benefits explained</div>
    <div class="become-affiliate-benefits__row">
      <div class="become-affiliate-benefits__col">
        <div class="benefit-item">
          <svg-icon name="trend-up" class="benefit-item__icon" />
          <div class="benefit-item__text">Earn up to 10% commission!</div>
        </div>
      </div>
      <div class="become-affiliate-benefits__col">
        <div class="benefit-item">
          <svg-icon name="money-wallet" class="benefit-item__icon" />
          <div class="benefit-item__text">Quick set-up, start earning immediately</div>
        </div>
      </div>
      <div class="become-affiliate-benefits__col">
        <div class="benefit-item">
          <svg-icon name="coins-percent" class="benefit-item__icon" />
          <div class="benefit-item__text">Strong conversion rate and retention</div>
        </div>
      </div>
      <div class="become-affiliate-benefits__col">
        <div class="benefit-item">
          <svg-icon name="talk-user" class="benefit-item__icon" />
          <div class="benefit-item__text">Affiliate manager to respond to requests and aid sign-up</div>
        </div>
      </div>
      <div class="become-affiliate-benefits__col">
        <div class="benefit-item">
          <svg-icon name="accounting-calculator" class="benefit-item__icon" />
          <div class="benefit-item__text">30 day cookie period and regular commission payments</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BecomeAffiliateBenefits'
};
</script>

<style lang="scss" scoped>
.become-affiliate-benefits {
  display: flex;
  gap: 24px;
  flex-direction: column;

  &__title {
    font-family: $Literata;
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 38.4px;
    letter-spacing: -0.01em;
    color: $color-dark-grey;
  }

  &__row {
    display: flex;

    @include gt-sm {
      gap: 24px;
    }

    @include lt-md {
      gap: 8px;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  &__col {
    @include gt-sm {
      flex: 1;
    }

    @include lt-md {
      width: calc(50% - 4px);
    }

    .benefit-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 183px;
      background: #f7f7f7;
      border-radius: 24px;
      box-sizing: border-box;
      padding: 16px;

      &__icon {
        @include gt-sm {
          width: 32px;
          height: 32px;
        }

        @include lt-md {
          width: 24px;
          height: 24px;
        }
      }

      &__text {
        @include gt-sm {
          font-family: $golos-regular;
          font-size: 16px;
          font-weight: 400;
          line-height: 21px;
          letter-spacing: -0.02em;
        }

        @include lt-md {
          font-size: 14px;
          line-height: 18px;
          letter-spacing: -0.01em;
        }
      }
    }
  }
}
</style>
