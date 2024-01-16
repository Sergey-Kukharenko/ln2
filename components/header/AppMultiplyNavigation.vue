<template>
  <div class="multiply-navigation">
    <div class="layout layout--horizontal-dt">
      <div class="multiply-navigation-list">
        <div class="multiply-navigation-list__item">
          <app-logo />
        </div>
        <div class="multiply-navigation-list__item">
          <app-trustbox />
          <!--Временно скрыт-->
          <!--<app-location />-->
        </div>
        <div class="multiply-navigation-list__item">
          <app-informer />
        </div>
        <div class="multiply-navigation-list__item">
          <app-navigation-user />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppLogo from '@/components/header/AppLogo';
// import AppLocation from '@/components/header/location/AppLocation';
import AppInformer from '@/components/header/AppInformer';
import AppNavigationUser from '@/components/header/AppNavigationUser';
import AppTrustbox from '~/components/ui/AppTrustbox.vue';

export default {
  name: 'AppMenu',

  components: {
    AppTrustbox,
    AppLogo,
    // AppLocation,
    AppInformer,
    AppNavigationUser
  }
};
</script>

<style lang="scss" scoped>
.multiply-navigation {
  @include gt-sm {
    position: relative;
    z-index: 5;
    padding: 24px 0 20px;
  }
}

.multiply-navigation-list {
  @include md {
    margin: 0 -8px;
  }

  @include gt-sm {
    display: flex;
    align-items: center;
    justify-content: space-between; //Временно добавлен
    flex-wrap: wrap;
    margin: 0 -16px;
  }

  &__item {
    @include gt-md {
      padding: 0 16px;
    }

    @include md {
      margin: 0 8px;
    }

    @include sm {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1 1 50%;
      margin: 8px 0;
    }

    @include lt-md {
      margin: 0;
    }

    &:first-child {
      @include lt-sm {
        display: none;
      }
    }

    &:nth-child(3) {
      margin: 0 78px 0 auto;
    }

    //Временно скрыт
    //&:last-child {
    //  @include gt-sm {
    //    margin-left: auto;
    //  }
    //}
  }
}
</style>
