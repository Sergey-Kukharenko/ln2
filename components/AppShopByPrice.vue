<template>
  <section class="layout shop-by-price">
    <div class="h2-title shop-by-price__title">
      {{ shopByPrice.title }}
    </div>

    <div class="list">
      <div v-for="(item, idx) in shopByPrice.list" :key="idx" class="list__item">
        <nuxt-link :to="{ name: `${item.prefix}-slug`, params: { slug: item.slug } }" class="card">
          <div class="card__figure">{{ item.type }}</div>
          <div class="card__group">
            <div class="h2-title card__title">
              {{ item.title }}
              <span v-if="item.currency" class="currency">
                {{ item.currency }}
              </span>
            </div>
            <div class="card__link">
              {{ item.link }}
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppShopByPrice',

  props: {
    shopByPrice: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style lang="scss" scoped>
.shop-by-price {
  &__title {
    @include lt-md {
      display: none;
    }
  }
}

.list {
  display: flex;

  @include gt-sm {
    gap: 24px;
  }

  @include lt-md {
    gap: 2px;
  }

  &__item {
    flex: 30%;
  }
}

.card {
  display: block;
  color: inherit;
  text-align: center;
  background: #f7f7f7;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.24s ease-out 0.03s;

  @include gt-sm {
    padding: 16px;
    border-radius: 16px;
  }

  @include lt-md {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 96px;
    height: 96px;
    padding: 6px;
    margin: auto;
    border-radius: 50%;
  }

  &:hover {
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }

  &__figure {
    display: inline-block;
    font-family: $golos-medium;
    color: $color-dark-grey;
    letter-spacing: 0.01em;
    background: #fff;
    line-height: 16px;
    border: 1px solid #393939;
    border-radius: 32px;

    @include gt-sm {
      font-size: 16px;
      padding: 10px 13px;
    }

    @include lt-md {
      font-size: 13px;
      line-height: 16px;
      padding: 3px 7px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &__title {
    @include gt-sm {
      margin: 4px 0;
    }

    @include lt-md {
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 2px;
    }
  }

  &__link {
    font-family: $golos-medium;
    color: $color-dark-green;

    @include gt-sm {
      font-size: 16px;
      line-height: 22px;
    }

    @include lt-md {
      font-size: 13px;
      line-height: 16px;
      letter-spacing: 0.01em;
    }
  }
}

.currency {
  @include lt-md {
    display: none;
  }
}
</style>
