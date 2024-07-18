<template>
  <main>
    <!-- Mobile layout -->
    <template v-if="isMobile">
      <div class="container mx-auto mt-3">
        <GeoSelect
          mobile
          @click="openCityBurger"
        />
      </div>
      <div class="flex flex-col">
        <div class="app__category container mx-auto mt-3 p-6 !pb-6">
          <div class="dfm mt-7 flex flex-col items-center">
            <h5 class="ui-text-ru-title-5">Внутри можно выбрать</h5>
            <p class="ui-text-ru-caption">• Количество роз <span class="mx-2">• Цвет</span> • Упаковку</p>
          </div>
          <div
            class="mt-6 grid grid-cols-4 gap-3"
            :class="{ '!grid-cols-2': isMobile }"
          >
            <ProductCard
              v-for="product in products"
              :key="product.id"
              small
              slider
              :product="product"
              :category="'Preview'"
            />
          </div>
        </div>
        <div class="container mx-auto">
          <PromoBlock class="!mt-2" />
        </div>
      </div>
      <p
        v-if="currentCity"
        class="ui-text-ru-description dmb container !mt-8"
        style="margin-bottom: -2rem"
      >
        {{ mainPageStore.seoData?.heading }}
      </p>
      <div
        v-for="(category, index) in mainPageStore.data?.offersBlocks"
        :key="category.categoryId"
      >
        <ProductCategory
          :category="category"
          :max="10"
        />
        <ReviewsBlock
          v-if="index === 0"
          :reviews="mainPageStore.reviews"
        />
        <CategoryBlock
          v-if="index === 1"
          class="dbm !mt-10"
        />
        <SelectionBlock
          v-if="index === 2"
          class="!mt-6"
        />
        <HomeSwiper v-if="index === 3" />
      </div>
      <FlowersCategories :flowers="mainPageStore.categories" />
      <QuestionBlock />
    </template>

    <!-- Desktop layout -->
    <template v-else>
      <div>
        <div
          v-if="currentCity"
          class="container mx-auto mt-4 flex items-center justify-center"
        >
          <p class="ui-text-ru-caption-1 text-blackGrey">{{ mainPageStore.seoData?.heading }}</p>
        </div>
        <div class="container mx-auto">
          <PromoBlock class="!mt-4" />
        </div>
        <CategoryBlock class="mt-8" />
        <div class="app__category container mx-auto mt-8 p-6">
          <div class="dnm flex w-full items-center">
            <p class="ui-text-ru-title-3 w-full text-center">
              Соберите свой букет роз.<br />
              Внутри вы можете указать длину, упаковку и цвет
            </p>
          </div>
          <div class="dfm mt-5 flex flex-col items-center">
            <h5 class="ui-text-ru-title-5">Внутри можно выбрать</h5>
            <p>• Количество роз • Цвет • Упаковку</p>
          </div>
          <div class="mt-6 grid grid-cols-4 gap-2">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              small
              :product="product"
              slider
              category="main"
            />
          </div>
        </div>
      </div>
      <div
        v-for="(category, index) in mainPageStore.data?.offersBlocks"
        :key="category.categoryId"
      >
        <ProductCategory
          :category="category"
          :max="7"
        />
        <ReviewsBlock
          v-if="index === 0"
          :reviews="mainPageStore.reviews"
          class="mt-8"
        />
        <div class="!mt-8">
          <SelectionBlock v-if="index === 1" />
        </div>
        <HomeSlider
          v-if="index === 2"
          class="mt-8"
        />
      </div>
      <div class="container mx-auto">
        <EmailSection
          class="mt-8"
          :mobile="false"
        />
      </div>
      <FlowersCategories
        class="mt-8"
        :flowers="mainPageStore.categories"
      />
      <QuestionBlock class="mt-8" />
    </template>
  </main>

  <AppCityModal
    :opened="cityModal"
    @close="cityModal = false"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCityStore } from '@/store/city';
import { useMainPageStore } from '~~/store/mainPage';

import PromoBlock from '@/components/home/PromoBlock.vue';
import CategoryBlock from '@/components/home/CategoryBlock.vue';
import ProductCard from '@/components/ProductCard.vue';
import ProductCategory from '@/components/home/ProductCategory.vue';
import ReviewsBlock from '@/components/home/ReviewsBlock.vue';
import SelectionBlock from '@/components/home/SelectionBlock.vue';
import EmailSection from '@/components/home/EmailSection.vue';
import FlowersCategories from '@/components/home/FlowersCategories.vue';
import QuestionBlock from '@/components/home/QuestionBlock.vue';
import GeoSelect from '@/components/GeoSelect.vue';
import HomeSwiper from '@/components/home/HomeSwiper.vue';

import { useMainStore } from '@/store/main';
const mainStore = useMainStore();
const mainPageStore = useMainPageStore();
const { isMobile } = storeToRefs(mainStore);

const cityStore = useCityStore();

const { currentCity } = storeToRefs(cityStore);

const cityModal = ref<boolean>(false);

const products = computed(() => {
  return mainPageStore.data?.bestOffers;
});

const mainP = await useAsyncData(() => mainPageStore.getMainPageData());
useHead({
  title: mainP.data.value?.seoData.pageTitle,
  meta: mainP.data.value?.seoData.metaTags.map((tag) => {
    return { [tag.attribute]: tag.name, content: tag.content };
  }),
});

useAsyncData(() => {
  return Promise.any([mainPageStore.getFilters(), mainPageStore.getReviews()]);
});

const openCityBurger = inject('openCityBurger', () => {});
</script>

<style scoped lang="scss">
.delivery {
  width: 100%;
  height: 68px;

  background: #ebfaf0;
  box-shadow: 0px 6px 16px rgba(51, 51, 50, 0.08);
  border-radius: 24px;
}
.app__category {
  background: #f7f7f7;
  border-radius: 24px;
  @include mobile {
    border-radius: 16px;
    background: linear-gradient(180deg, #f7f7f7 0%, rgba(247, 247, 247, 0) 79.8%, rgba(247, 247, 247, 0) 79.8%);
  }
}
</style>
