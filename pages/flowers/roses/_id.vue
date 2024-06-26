<template>
  <div class="layout layout-dt detail-page">
    <div class="detail-page__row">
      <div class="detail-page__col">
        <app-gallery :items="items" />
        <app-notification :notification="notification" />
      </div>
      <div class="detail-page__col">
        <app-form-sizes v-if="isSizePage" :product="product" />
        <app-form-lists v-if="isListsPage" :product="product" />
        <app-service :service="service" />
      </div>
    </div>

    <div style="display: none">
      <div class="detail-page__about about">
        <h2 class="about__title">
          {{ reviews.title }}
        </h2>
        <div class="about__row">
          <div class="about__reviews">
            <app-reviews :reviews="reviews.list" />
          </div>
          <div class="about__rating">
            <app-rating v-if="rating.count" :rating="rating" />
          </div>
        </div>
      </div>

      <div class="detail-page__section">similar</div>
      <div class="detail-page__section">recently</div>
      <div class="detail-page__section">
        <app-popular-categories-items :popular="popular" />
      </div>
    </div>
  </div>
</template>

<script>
import AppFormLists from '@/components/card-product/AppFormLists.vue';
import AppFormSizes from '@/components/card-product/AppFormSizes.vue';
import AppNotification from '@/components/card-product/AppNotification.vue';
import AppRating from '@/components/card-product/AppRating.vue';
import AppReviews from '@/components/card-product/AppReviews.vue';
import AppService from '@/components/card-product/AppService.vue';
import AppGallery from '@/components/ui/AppGallery.vue';
import products from '@/data/products';
import AppPopularCategoriesItems from '~/components/card-product/AppPopularCategoriesItems.vue';

export default {
  name: 'IdPage',

  components: {
    AppNotification,
    AppGallery,
    AppFormSizes,
    AppFormLists,
    AppService,
    AppReviews,
    AppRating,
    AppPopularCategoriesItems
  },

  asyncData(context) {
    const id = context.route.params.id;
    const product = products.find((item) => item.id === +id);
    const items = product.items;
    const notification = product.notification;
    const typeOfPage = product.type_of_page;
    const service = product.service;
    const reviews = product.reviews;
    const rating = product.rating;
    const popular = product.popular;

    return {
      product,
      items,
      notification,
      typeOfPage,
      service,
      reviews,
      rating,
      popular
    };
  },

  computed: {
    isSizePage() {
      return this.typeOfPage === 'size_page';
    },

    isListsPage() {
      return this.typeOfPage === 'lists_page';
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-page {
  @include lt-md {
    overflow: hidden;
  }

  &__row {
    @include gt-sm {
      display: flex;
    }
  }

  &__col {
    box-sizing: border-box;

    @include gt-sm {
      width: 50%;

      &:first-child {
        padding-right: 12px;
      }

      &:last-child {
        padding-left: 12px;
      }
    }
  }

  &__section {
    @include gt-sm {
      margin: 76px 0;
    }

    @include lt-md {
      margin: 40px 0;
    }
  }
}

.about {
  &__title {
    @include gt-sm {
      margin: 0 0 16px 0;
    }
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__reviews {
    @include gt-sm {
      flex: 0 0 620px;
    }

    @include lt-md {
      order: 1;
    }
  }

  &__rating {
    @include gt-sm {
      flex: 0 0 344px;
    }

    @include lt-md {
      width: 100%;
    }
  }

  &__text {
    font-family: $golos-bold;
    font-size: 16px;
    line-height: 20px;
    color: #000;
    margin-right: 10px;
  }
}
</style>
