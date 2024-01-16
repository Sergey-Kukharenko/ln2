<template>
  <app-fake-trustpilot />
  <!--  Временно скрыт-->
  <!--  <client-only>-->
  <!--    <trustbox :template-id="trustpilotTemplateId" />-->
  <!--  </client-only>-->
</template>

<script>
import AppFakeTrustpilot from '~/components/fake-trustpilot/AppFakeTrustpilot.vue';

export default {
  name: 'AppTrustbox',
  components: { AppFakeTrustpilot },

  data() {
    return {
      trustpilotTemplateId: process.env.trustpilotTemplateId,
      rate: 5
    };
  }
};
</script>

<style lang="scss">
.trustpilot-widget {
  height: 20px;
  overflow: hidden;

  @include lt-md {
    width: 300px;
  }
}
</style>
