<template>
  <div>
    <app-search-box />
  </div>
</template>

<script>
import AppSearchBox from '~/components/header/search/AppSearchBox.vue';

export default {
  name: 'IndexPage',
  components: { AppSearchBox },
  layout: 'empty'
};
</script>
