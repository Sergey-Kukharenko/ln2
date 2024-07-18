<template>
  <div
    id="main"
    class="main"
    :class="{ 'is-mobile': isMobile, 'main--loading': !DOMLoaded || loading }"
  >
    <div
      v-if="!isMobile"
      class="bg-pink header__message flex items-center justify-center"
    >
      <p class="ui-text-ru-title-5 banner__text text-white">Цветы простоят 5 дней! Или заменим букет!</p>
    </div>
    <Transition>
      <div
        v-if="isMobile"
        class="menu__overlay"
        :class="{ '--opened': burgerOpen }"
        @click="setBurger(false)"
      ></div>
    </Transition>
    <BurgerMenu
      v-if="isMobile"
      ref="burger"
      :opened="burgerOpen"
      @login="loginModal = true"
      @open="burgerOpen = true"
    />
    <AppHeader
      :is-mobile="isMobileState"
      @login="loginModal = true"
    />
    <slot />

    <AppShortFooter v-if="isShortFooter" />
    <AppFooter
      v-else
      :is-mobile="isMobileState"
    />

    <AppNotifications />

    <AppLoginFrom
      :opened="loginModal"
      :is-mobile="isMobile"
      @close="loginModal = false"
    />

    <AppNoProductModal
      :opened="cityStore.noProductModal"
      :is-mobile="isMobile"
      @close="cityStore.closeNoProductModal"
    />

    <!-- <AppCookie
      v-if="!cookieSeen"
      :is-mobile="isMobileState"
    /> -->
  </div>
  <Transition>
    <div
      v-if="!DOMLoaded || filterStore.loading || loading"
      class="loader__layout"
    >
      <AppLoader />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import AppFooter from '@/components/AppFooter.vue';
import AppShortFooter from '~~/components/AppShortFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppLoginFrom from '@/components/AppLoginForm.vue';
import AppLoader from '@/components/AppLoader.vue';
import BurgerMenu from '@/components/BurgerMenu.vue';
// import AppCookie from '~~/components/AppCookie.vue';
import AppNotifications from '@/components/AppNotifications.vue';
import AppNoProductModal from '~~/components/AppNoProductModal.vue';

import { useMainStore } from '@/store/main';
import { useFilterStore } from '~~/store/filters';
import { useCityStore } from '~~/store/city';

const route = useRoute();

const mainStore = useMainStore();
const filterStore = useFilterStore();
const cityStore = useCityStore();

const { isMobile, burgerOpen, DOMLoaded, loading } = storeToRefs(mainStore);
const { setBurger } = mainStore;

const isMobileState = ref<boolean>(false);

const isShortFooter = computed(() => {
  return route.path === '/cart' || route.path === '/checkout';
});

const loginModal = ref<boolean>(false);
const cookieSeen = ref<boolean>(true);
onMounted(() => {
  cookieSeen.value = !!localStorage.getItem('cookieSeen');
});

const burger = ref(null);
const openCityBurger = () => {
  burgerOpen.value = true;
  if (burger.value) {
    // @ts-ignore
    burger.value.openCity();
  }
};
provide('openCityBurger', openCityBurger);

const openLogin = () => {
  loginModal.value = true;
};
provide('openLogin', openLogin);
</script>

<style scoped lang="scss">
.menu__overlay {
  position: fixed;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0;

  transition: 0.3s;

  pointer-events: none;
  touch-action: none;
  &.--opened {
    z-index: 100;
    opacity: 0.7;
    pointer-events: auto;
    touch-action: auto;
  }
}

.header__message {
  height: 40px;
  width: 100%;
  z-index: 101;
}

.banner__text {
  @include mobile {
    font-weight: 500;
    font-size: rem(13) !important;
    line-height: rem(16) !important;
  }
}

.loader__layout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}

.main {
  transition: 0.3s;
  opacity: 1;
}

.main--loading {
  filter: blur(2px);
}
</style>
