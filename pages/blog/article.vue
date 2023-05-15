<template>
  <div class="layout layout--horizontal article">
    <article-card :card="card" />
  </div>
</template>

<script>
import dataArticle from '~/data/article';

import ArticleCard from '~/components/article/article-card.vue';

export default {
  name: 'ArticlePage',
  components: { ArticleCard },

  layout: 'empty',

  data() {
    return {
      card: dataArticle.card
    };
  }
};
</script>

<style scoped lang="scss"></style>
