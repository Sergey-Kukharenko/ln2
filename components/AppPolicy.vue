<template>
  <div class="links">
    <a v-for="link in policyLinks" :key="link.label" :href="link.url" target="_blank" class="link">{{ link.label }}</a>
  </div>
</template>

<script>
import dataPolicy from '@/data/policy';

export default {
  name: 'AppPolicy',

  data() {
    return {
      policyLinks: dataPolicy
    };
  }
};
</script>

<style scoped lang="scss">
.links {
  display: flex;
  flex-wrap: wrap;

  @include gt-sm {
    align-items: center;
    margin-bottom: 2px;
    column-gap: 12px;
  }

  @include lt-md {
    margin: 10px 0;
    column-gap: 12px;
  }
}

.link {
  font-family: $golos-regular;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: $color-dark-green;
}
</style>
