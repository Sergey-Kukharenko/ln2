<template>
  <div class="footer-bottom">
    <div class="layout">
      <div class="footer-bottom__content">
        <app-policy />
        <div class="text">{{ footer.rights }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AppPolicy from '@/components/AppPolicy.vue';

export default {
  name: 'CheckoutFooterBottom',

  components: { AppPolicy },

  computed: {
    ...mapGetters({ footer: 'layout/getFooter' })
  }
};
</script>

<style lang="scss" scoped>
.footer-bottom {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: $bg-grey;

  @include gt-sm {
    height: 96px;
    padding: 24px 0;
  }

  @include lt-md {
    height: 119px;
    padding: 28px 0;
  }

  .layout {
    width: 100%;

    @include gt-sm {
      padding-left: 0;
    }
  }

  &__content {
    height: 100%;

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

  @include lt-md {
    margin-top: 32px;
  }
}
</style>
