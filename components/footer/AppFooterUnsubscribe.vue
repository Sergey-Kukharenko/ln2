<template>
  <div class="footer-unsubscribe">
    <div class="layout layout--horizontal-dt">
      <div class="container">
        <apps-list :list="list" />
        <div class="rights">{{ rights }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import AppsList from '~/components/AppsList.vue';
import footerUnsubscribe from '~/data/footer-unsubscribe';

export default {
  name: 'AppFooterUnsubscribe',
  components: { AppsList },

  data() {
    return {
      list: footerUnsubscribe.list,
      rights: footerUnsubscribe.rights
    };
  }
};
</script>

<style scoped lang="scss">
.footer-unsubscribe {
  border-top: 1px solid #f2f2f2;
  padding: 20px 0;

  @include gt-sm {
    margin-top: auto;
  }
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 714px;
}

.rights {
  color: $color-white-grey;
  text-align: right;
  font-family: $golos-regular;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12px;
}
</style>
