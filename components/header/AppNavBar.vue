<template>
  <div class="navbar">
    <div class="layout layout--horizontal-dt">
      <div class="navbar-list">
        <div class="navbar-list__item">
          <app-menu />
        </div>
        <div class="navbar-list__item content">
          <!--Временно скрыт-->
          <!--<div class="content__static">-->
          <!--  <app-search />-->
          <!--</div>-->
          <div class="content__scrolled list">
            <div class="list__item">
              <app-call />
            </div>
            <div class="list__item">
              <app-cart theme="inline" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppCall from '@/components/header/AppCall.vue';
import AppCart from '@/components/header/AppCart.vue';
import AppMenu from '~/components/header/menu/AppMenu.vue';
// import AppSearch from '~/components/header/search/AppSearch.vue';

export default {
  name: 'AppNavBar',

  components: {
    AppMenu,
    // AppSearch,
    AppCart,
    AppCall
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  background: #fff;
  padding: 8px 0;

  @include gt-sm {
    border-top: 1px solid #eaeaea;
  }

  @include lt-md {
    border-top: 1px solid #dde0e6;
  }

  .content {
    @include lt-md {
      display: none;
    }
  }
}

.navbar-list {
  @include gt-sm {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__item {
    &:last-child {
      @include lt-sm {
        display: none;
      }
    }
  }
}

.content {
  &__static {
    display: block;
  }

  &__scrolled {
    display: none;
  }
}
</style>
