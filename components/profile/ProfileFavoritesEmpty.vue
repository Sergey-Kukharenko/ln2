<template>
  <figure class="favorites-empty">
    <img :src="img.src" :alt="img.alt" />
    <figcaption class="figcaption">
      {{ figcaption }}
    </figcaption>
  </figure>
</template>

<script>
import Vue from 'vue';

import profile from '~/data/profile';

const { img, figcaption } = profile.pages.favorites.empty;
export default Vue.extend({
  name: 'ProfileFavoritesEmpty',

  data() {
    return {
      img,
      figcaption
    };
  }
});
</script>

<style scoped lang="scss">
.favorites-empty {
  box-sizing: border-box;

  @include gt-sm {
    min-height: 200px;
    padding: 24px;
    border: 1px dashed #cccccc;
    border-radius: 16px;
  }

  @include lt-md {
    padding: 86px 0;
  }
}

img {
  display: block;
  max-width: 59px;
  margin: 0 auto;
}

.figcaption {
  font-family: $golos-regular;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.01em;
  text-align: center;
  max-width: 282px;
  margin: 10px auto 0;
}
</style>
