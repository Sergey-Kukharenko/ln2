<template>
  <section class="row layout">
    <div class="info-text">
      <div v-for="(item, index) in content.columns" :key="index" class="info-text__item item">
        <div class="item__title">{{ item.title }}</div>
        <div class="item__text">{{ item.text }}</div>
      </div>
    </div>
    <div class="main-text">{{ content.mainText }}</div>
  </section>
</template>

<script>
export default {
  name: 'AppInfoTextSection',

  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style lang="scss" scoped>
.row {
  width: 100%;
  display: flex;
  justify-content: space-between;

  @include lt-md {
    flex-direction: column;
    gap: 24px;
  }

  .info-text {
    display: flex;

    @include gt-sm {
      gap: 51px;
      width: 436px;
    }

    @include lt-md {
      gap: 16px;
    }

    .item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
      border-top: 1px solid $color-dark-grey;

      @include gt-sm {
        padding-top: 12px;
      }

      @include lt-md {
        padding-top: 8px;
      }

      &__title {
        font-family: $Literata;
        font-weight: 700;
        color: $color-dark-grey;
        line-height: 120%;

        @include gt-sm {
          font-size: 24px;
        }

        @include lt-md {
          font-size: 20px;
          letter-spacing: -0.2px;
        }
      }

      &__text {
        font-family: $golos-regular;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.01em;
        color: $color-dark-grey;
      }
    }
  }

  .main-text {
    font-family: $Literata;
    font-style: normal;
    font-weight: 700;
    color: $color-dark-grey;

    @include gt-sm {
      width: 528px;
      font-size: 24px;
      line-height: 120%;
    }

    @include lt-md {
      font-size: 20px;
      line-height: 24px;
      letter-spacing: -0.01em;
    }
  }
}
</style>
