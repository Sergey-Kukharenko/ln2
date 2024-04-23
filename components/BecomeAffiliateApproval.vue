<template>
  <div class="layout become-affiliate-approval">
    <div class="become-affiliate-approval__row">
      <div class="become-affiliate-approval__col">
        <div class="become-affiliate-approval__head">
          <div class="become-affiliate-approval__title">Approval</div>
          <div class="become-affiliate-approval__description text">
            We consider all applicants, no matter how big or small your following/traffic is.
          </div>
        </div>
        <div class="become-affiliate-approval__block">
          <div class="become-affiliate-approval__title">FAQ & Tips</div>
          <ul class="become-affiliate-approval__list">
            <li class="become-affiliate-approval__item text">
              For more information, please refer to the FAQ sign-up guide here, which contains all of the information
              you need to get started.
            </li>
            <li class="become-affiliate-approval__item text">
              For any queries, don't hesitate to get in touch with our affiliate team at
              <a class="become-affiliate-approval__link" href="mailto:affiliates@hidemarketingagency.co.uk"
                >affiliates@hidemarketingagency.co.uk</a
              >
            </li>
          </ul>
        </div>
        <div class="become-affiliate-approval__block">
          <div class="become-affiliate-approval__title">Terms & Conditions</div>
          <ul class="become-affiliate-approval__list">
            <li class="become-affiliate-approval__item text">
              The commission is subject to the terms of our Awin affiliate programme. The affiliate will receive
              commission directly from Awin.
            </li>
            <li class="become-affiliate-approval__item text">
              MyFlowers are not obliged to pay any commission under the affiliate program and reserve the right to amend
              the terms and conditions without notice from time to time. MyFlowers shall not be liable to the affiliate
              in contract, tort (including negligence) or otherwise for any of the following losses or damages arising
              out of or in connection with the affiliate scheme (including but not limited to the use of MyFlowers
              products).
            </li>
          </ul>
        </div>
        <a href="https://ui.awin.com/merchant-profile/48471" target="_blank" rel="nofollow noopener">
          <app-button class="become-affiliate-approval__button" size="full">Become a partner</app-button>
        </a>
      </div>
      <div class="become-affiliate-approval__col">
        <img
          class="become-affiliate-approval__image"
          src="/images/become-affiliate-approval.png"
          alt="become-affiliate-approval"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/shared/AppButton.vue';

export default {
  name: 'BecomeAffiliateApproval',

  components: { AppButton }
};
</script>

<style lang="scss" scoped>
.become-affiliate-approval {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__row {
    display: flex;

    @include gt-sm {
      gap: 40px;
    }

    @include lt-md {
      gap: 20px;
      flex-direction: column-reverse;
    }
  }

  &__col {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
  }

  &__title {
    font-family: $golos-medium;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    color: $color-dark-grey;
    margin-bottom: 8px;
  }

  &__link {
    color: #26ad4f;
  }

  &__list {
    padding-inline-start: 20px;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  &__button {
    margin-top: 2px;
  }

  &__image {
    @include gt-sm {
      height: 574px;
    }

    @include lt-md {
      width: 100%;
    }
  }

  .text {
    font-family: $golos-regular;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.02em;
    color: $color-dark-grey;
  }
}
</style>
