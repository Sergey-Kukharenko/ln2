<template>
  <section class="layout bestsellers">
    <app-section-header v-bind="{ headerProps }" />
    <app-swiper v-slot="slotProps" :slides="slides" :options="options">
      <app-card :slide="{ ...slotProps }" />
    </app-swiper>
  </section>
</template>

<script>
import AppCard from '@/components/shared/AppCard.vue';
import AppSwiper from '@/components/ui/AppSwiper.vue';
import dataBestsellers from '@/data/bestsellers';
import AppSectionHeader from '~/components/shared/AppSectionHeader.vue';

const { main, list } = dataBestsellers;

export default {
  name: 'AppBestsellers',

  components: {
    AppSectionHeader,
    AppSwiper,
    AppCard
  },

  data() {
    return {
      headerProps: main,
      slides: list,
      options: {
        slidesPerView: 2,
        spaceBetween: 8,
        freeMode: true,
        breakpoints: {
          599: {
            slidesPerView: 3,
            spaceBetween: 16
          },
          959: {
            slidesPerView: 4,
            spaceBetween: 16
          }
        }
      }
    };
  }
};
</script>

<style scoped lang="scss">
.bestsellers {
  margin-top: 0;
}
</style>
