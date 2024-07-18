<template>
  <div class="card-link">
    <a v-if="isProductPage" :href="`/product/${slug}`" class="figure absolute-grow">
      <slot />
    </a>
    <nuxt-link v-else :to="{ name: 'product-id', params: { id: slug } }" class="figure absolute-grow">
      <slot />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'AppCardLink',

  props: {
    slug: {
      type: String,
      default: ''
    },

    isProductPage: {
      type: Boolean,
      default: false
    }
  }
};
</script>
