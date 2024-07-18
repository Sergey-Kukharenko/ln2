<template>
  <section
    class="container mx-auto pb-11"
    :class="{ 'mb-10': mainStore.isMobile }"
  >
    <h1
      class="ui-text-ru-title-1 mt-10 mb-8"
      :class="{ 'ui-text-ru-title-4': mainStore.isMobile }"
    >
      Избранные букеты
    </h1>
    <div
      v-if="favoritesStore.favorites.length === 0"
      class="mx-auto flex flex-col items-center"
    >
      <img
        src="/img/favorite.png"
        alt="Избранные букеты"
      />
      <h3
        class="ui-text-ru-title-3 mt-6"
        :class="{ 'ui-text-ru-title-5 mb-14': mainStore.isMobile }"
      >
        {{ pageTitle }}
      </h3>
      <p
        class="ui-text-ru-body mt-3 mb-6 w-2/4 text-center !font-normal"
        :class="{ 'mt-6 !w-full': mainStore.isMobile }"
      >
        {{ pageText }}
      </p>
      <AppButton @click="btnClick">
        <p class="ui-text-ru-button px-10">{{ pageButton }}</p>
      </AppButton>
    </div>
    <div
      v-else
      class="grid grid-cols-4 gap-x-4 gap-y-8"
      :class="{ '!grid-cols-2': mainStore.isMobile }"
    >
      <ProductCard
        v-for="product in favoritesStore.favorites"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useFavStore } from '~~/store/favorite';
import ProductCard from '~~/components/ProductCard.vue';
import AppButton from '~~/components/ui/AppButton.vue';
import { useMainStore } from '~~/store/main';

const favoritesStore = useFavStore();
const mainStore = useMainStore();

useHead({
  title: 'Избранные товары',
  meta: [
    { name: 'og:title', content: 'Избранные товары' },
    { name: 'og:description', content: 'Избранные товары' },
  ],
});

const isLogin = true;

const pageTitle = computed(() => {
  if (isLogin) {
    return 'У вас пока нет избранных товаров';
  }
  return 'Войдите в свою учетную запись';
});

const pageText = computed(() => {
  if (isLogin) {
    return 'Добавляйте понравившиеся букеты в избранное, чтобы не искать их, каждый раз перед покупкой';
  }
  return 'Таким образом, вы сможете просматривать сохраненные букеты на любых устройствах. Это удобно!';
});

const pageButton = computed(() => {
  if (isLogin) {
    return 'Выбрать букет';
  }
  return 'Войти';
});

const openLogin = inject('openLogin', () => {});
function btnClick() {
  if (isLogin) {
    useRouter().push('/');
  } else {
    openLogin();
  }
}
</script>
