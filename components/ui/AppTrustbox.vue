<template>
  <client-only>
    <trustbox :template-id="trustpilotTemplateId" />
  </client-only>
</template>

<script>
export default {
  name: 'AppTrustbox',

  data() {
    return {
      trustpilotTemplateId: process.env.trustpilotTemplateId
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
