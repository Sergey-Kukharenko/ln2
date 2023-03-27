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
  @include gt-sm {
    display: flex;
    align-items: center;
    margin: 0 -12px 2px -12px;
  }

  @include lt-md {
    margin: 10px -4px;
  }
}

.link {
  font-family: $golos-regular;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: $color-dark-green;
  margin: 0 12px;

  @include gt-sm {
    margin: 0 12px;
  }

  @include lt-md {
    display: none;
  }
}
</style>
