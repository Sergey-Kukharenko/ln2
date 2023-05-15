<template>
  <div class="layout layout--horizontal blog">
    <div class="blog-header">
      <div class="blog-header__item">
        <app-input v-model="searchArticles" :size="changeableSize" placeholder="Search articles" class="blog-input">
          <template v-if="$device.isDesktop" #right>
            <basket-button size="small" theme="white" align="center" size-not-change @click="submitHandler">
              To find
            </basket-button>
          </template>
        </app-input>
      </div>
      <div class="blog-header__item blog-header__item--outside">
        <blog-list-tags :list="categories" />
      </div>
    </div>

    <blog-list v-slot="slotProps" :list="defaultList" contains-large-cards>
      <blog-card :card="{ ...slotProps }" />
    </blog-list>

    <app-discount :info="info" theme="subscribe" class="blog-discount" />

    <blog-list v-slot="slotProps" :list="list">
      <blog-card :card="{ ...slotProps }" />
    </blog-list>

    <app-pagination
      :options="pagination"
      :loading="loading"
      has-show-more-btn
      class="blog-pagination"
      @load-data="loadMore"
    />
  </div>
</template>

<script>
import dataFormSubscribeInfo from '~/data/form-subscribe-info';

import AppInput from '~/components/shared/AppInput.vue';
import BasketButton from '~/components/BasketButton.vue';
import dataBlog from '~/data/blog';
import BlogListTags from '~/components/blog/blog-list-tags.vue';
import BlogList from '~/components/blog/blog-list.vue';
import BlogCard from '~/components/blog/blog-card.vue';
import AppDiscount from '~/components/AppDiscount.vue';
import { PAGINATION } from '~/constants';
import AppPagination from '~/components/shared/AppPagination.vue';

export default {
  name: 'BlogPage',

  components: { AppPagination, AppDiscount, BlogCard, BlogList, BlogListTags, BasketButton, AppInput },

  layout: 'blog',

  data() {
    return {
      searchArticles: '',
      categories: dataBlog.categories,
      defaultList: dataBlog.defaultList,
      list: dataBlog.list,
      info: dataFormSubscribeInfo.subscribe,

      loading: false
    };
  },

  async fetch({ store, route }) {
    // const { slug } = route.params;
    const slug = 'roses';

    await store.dispatch('blog/fetchBlog', {
      slug,
      params: {
        limit: PAGINATION.limit
      }
    });
  },

  head() {
    return {
      title: this.blogSeo?.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.blogSeo?.description ?? ''
        }
      ]
    };
  },

  computed: {
    blogTitle() {
      return this.$store.getters['blog/getBlog']?.main?.title ?? this.$route.params.slug.split('-').join(' ');
    },

    blogSeo() {
      return this.$store.getters['blog/getBlogSeo'];
    },

    changeableSize() {
      return this.$device.isDesktop ? 'x-large' : 'x-medium';
    },

    blogList() {
      return this.$store.getters['blog/getBlog']?.list ?? [];
    },

    pagination() {
      return this.$store.getters['blog/getBlog']?.pagination;
    }
  },

  methods: {
    async loadMore({ page, isShowMore = false }) {
      if (Number.isNaN(parseInt(page))) {
        return;
      }

      this.loading = true;

      const payload = {
        // slug: this.$route.params.slug,
        slug: 'roses',
        params: {
          page,
          limit: PAGINATION.limit
        }
      };

      await this.$store.dispatch('blog/fetchBlog', {
        ...payload,
        isConcated: isShowMore
      });

      this.loading = false;
    },

    submitHandler() {
      if (!this.searchArticles) {
        return;
      }

      console.log('do something ...');
    }
  }
};
</script>

<style scoped lang="scss">
.blog-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @include gt-sm {
    margin: 12px 0 32px;
  }

  &__item {
    @include gt-sm {
      width: calc(50% - 12px);
    }

    @include lt-md {
      margin: 16px 0;
    }

    &:not(&--outside) {
      @include lt-md {
        width: 100%;
      }
    }

    &--outside {
      @include lt-md {
        width: calc(100% + 24px);
        margin: 0 -12px;
      }
    }
  }
}

.blog-discount {
  @include gt-sm {
    margin: 12px 0;
  }

  @include lt-md {
    margin: 8px 0;
  }
}

.blog-btn {
  @include gt-sm {
    display: block;
  }

  @include lt-md {
    display: none;
  }
}

.blog-pagination {
  max-width: 712px;
  margin: 40px auto 80px;
}
</style>
