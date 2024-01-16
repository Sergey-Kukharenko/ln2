<template>
  <div class="footer-bottom">
    <div class="layout layout--horizontal-dt">
      <div class="footer-bottom__content">
        <app-payment />
        <div>
          <app-policy />
          <div class="text">{{ footer.rights }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AppPayment from '@/components/AppPayment.vue';
import AppPolicy from '@/components/AppPolicy.vue';

export default {
  name: 'AppFooterBottom',

  components: { AppPayment, AppPolicy },

  computed: {
    ...mapGetters({ footer: 'layout/getFooter' })
  }
};
</script>

<style lang="scss" scoped>
.footer-bottom {
  background: $bg-grey;

  @include gt-sm {
    padding: 24px 0;
  }

  @include lt-md {
    padding: 28px 0;
  }

  &__content {
    @include gt-sm {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.text {
  font-family: $golos-regular;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: #7c7c7c;

  @include gt-sm {
    text-align: right;
    margin-left: 10px;
  }
}
</style>
