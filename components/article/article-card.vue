<template>
  <div class="article-card">
    <div class="article-card__figure">
      <img :src="card.img" class="article-card__image" :alt="card.title" />
    </div>

    <div class="article-card__container">
      <div class="article-card__content">
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
  </div>
</template>

<script>
import AppToggleable from '~/components/shared/AppToggleable.vue';

export default {
  name: 'ArticleCard',
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
.article-card {
  position: relative;
  overflow: hidden;

  @include gt-sm {
    border-radius: 24px;
  }

  @include lt-md {
    border-radius: 8px;
  }

  &__figure {
    position: relative;
    background: #f7f7f7;

    @include gt-sm {
      padding-top: 40%;
    }

    @include lt-md {
      padding-top: 48.70222%;
    }
  }

  &__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &__container {
    @include gt-sm {
      display: flex;
      justify-content: flex-end;
      z-index: 2;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 32px;
    }

    @include lt-md {
      padding: 8px 0;
    }
  }

  &__content {
    background: #ffffff;

    @include gt-sm {
      display: flex;
      flex-direction: column;
      width: 495px;
      padding: 24px;
      border-radius: 16px;
      box-sizing: border-box;
      z-index: 2;
    }
  }
}

.header {
  display: flex;
  align-items: center;

  &__subject,
  &__date {
    font-family: $golos-regular;

    @include gt-sm {
      font-size: 14px;
      line-height: 18px;
    }

    @include lt-md {
      font-size: 12px;
      line-height: 16px;
    }
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
  font-family: $Literata;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: $color-dark-grey;

  @include gt-sm {
    margin: 24px 0 0;
  }

  @include lt-md {
    margin: 8px 0 16px;
  }

  @include gt-sm {
    font-size: 40px;
    line-height: 48px;
  }

  @include lt-md {
    font-size: 18px;
    line-height: 22px;
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
    margin: auto -4px 4px -4px;
  }

  @include lt-md {
    margin: 7px -4px 0 -4px;
  }

  &__item {
    @include gt-sm {
      margin: 0 4px;
    }

    @include lt-md {
      margin: 0 4px;
    }
  }
}
</style>
