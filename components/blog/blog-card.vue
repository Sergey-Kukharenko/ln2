<template>
  <div class="blog-card">
    <div class="blog-card__figure">
      <img :src="card.img" class="blog-card__figure-image" :alt="card.title" />
    </div>

    <div class="blog-card__content">
      <div class="header">
        <span class="header__subject">{{ card.subject }}</span>
        <span class="header__point" />
        <span class="header__date">{{ card.date }}</span>
      </div>
      <div class="title">{{ card.title }}</div>
      <div class="description">{{ card.description }}</div>
      <div class="footer">
        <div class="footer__item">
          <app-toggleable :item="card.like" icon-name="like-outline" @setItem="onSetLike" />
        </div>
        <div class="footer__item">
          <app-toggleable :item="card.bookmarks" icon-name="bookmark-outline" @setItem="onSetBookmark" />
        </div>
        <div class="footer__item">
          <app-toggleable :item="card.messages" disabled icon-name="message" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppToggleable from '~/components/shared/AppToggleable.vue';

export default {
  name: 'BlogCard',

  components: { AppToggleable },

  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    onSetLike(item) {
      console.log('onSetLike');
      console.log(item);
    },

    onSetBookmark(item) {
      console.log('onSetBookmark');
      console.log(item);
    }
  }
};
</script>

<style scoped lang="scss">
.blog-card {
  display: flex;
  flex-direction: column;

  &__figure {
    width: 100%;
    padding-top: 58.13999%;
    position: relative;
    border-radius: 16px 16px 0 0;
    overflow: hidden;
  }

  &__figure-image {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
  }

  &__content {
    flex: 1;
    border: 1px solid #eaeaea;
    border-top: none;
    border-radius: 0 0 16px 16px;
    box-sizing: border-box;

    @include gt-sm {
      padding: 16px;
    }

    @include lt-md {
      padding: 8px 16px 14px 16px;
    }
  }
}

.header {
  display: flex;
  align-items: center;

  &__subject,
  &__date {
    font-family: $golos-regular;
    font-size: 12px;
    line-height: 16px;
  }

  &__subject {
    color: $color-dark-green;
  }

  &__date {
    color: $color-dark-grey;
  }

  &__point {
    width: 2px;
    height: 2px;
    background: $color-dark-grey;
    border-radius: 50%;
    margin: 0 4px;
  }
}

.title {
  font-family: $golos-bold;
  letter-spacing: -0.02em;
  color: $color-dark-grey;
  margin: 7px 0;

  @include gt-sm {
    font-size: 18px;
    line-height: 22px;
  }

  @include lt-md {
    font-size: 16px;
    line-height: 18px;
  }
}

.description {
  font-family: $golos-regular;
  color: $color-dark-grey;

  @include gt-sm {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
  }

  @include lt-md {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.02em;
  }
}

.footer {
  display: flex;

  @include gt-sm {
    margin: 16px -5px 5px -5px;
  }

  @include lt-md {
    margin: 7px -4px 0 -4px;
  }

  &__item {
    @include gt-sm {
      margin: 0 5px;
    }

    @include lt-md {
      margin: 0 4px;
    }
  }
}
</style>
