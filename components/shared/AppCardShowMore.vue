<template>
  <nuxt-link
    :to="{
      name: `${prefix}-slug`,
      params: {
        slug
      }
    }"
    class="card"
  >
    <div class="container">
      <div class="group">
        <div class="title">
          <div class="title__plus">+</div>
          <div class="title__count">{{ rest }}</div>
        </div>
        <div class="subtitle">bouquets inside</div>
      </div>
    </div>
    <div class="footer">
      <div class="footer__text">Show more bouquets</div>
      <div class="footer__circle">
        <svg-icon name="arrow-right" class="icon" />
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'AppCardShowMore',

  props: {
    slug: {
      type: String,
      default: ''
    },

    prefix: {
      type: String,
      default: ''
    },

    rest: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  display: block;
  width: 100%;
  height: 100%;
  background: #ebfaf0;

  color: $color-dark-green;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.24s ease-out 0s;

  @include gt-sm {
    font-family: $golos-bold;
    padding: 16px;
    border-radius: 12px 12px 64px 12px;
  }

  @include lt-md {
    font-family: $golos-medium;
    padding: 8px;
    border-radius: 8px;
  }

  &:hover {
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);

    .footer__circle {
      background: $color-dark-green;

      & .icon {
        color: white;
      }
    }
  }
}

.container {
  @include gt-sm {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 240px;
    background: #ffffff;
    border-radius: 12px 12px 64px 12px;
  }

  @include lt-md {
    display: none;
  }
}

.title {
  display: flex;
  align-items: center;

  &__plus {
    font-size: 24px;
    margin-right: 2px;
  }

  &__count {
    font-size: 72px;
  }
}

.subtitle {
  max-width: 116px;
  font-size: 24px;
  text-align: center;
  margin-top: 3px;
}

.footer {
  display: flex;
  align-items: center;

  @include gt-sm {
    margin-top: 27px;
    justify-content: space-between;
  }

  @include lt-md {
    justify-content: center;
  }

  &__text {
    @include gt-sm {
      max-width: 90px;
      font-size: 16px;
    }

    @include lt-md {
      font-size: 13px;
    }
  }

  &__circle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 50%;
    overflow: hidden;
    transition: background 0.24s ease-out 0.03s;

    @include gt-sm {
      width: 50px;
      height: 50px;
    }

    @include lt-md {
      width: 24px;
      height: 24px;
      margin-left: 8px;
    }

    & .icon {
      transition: color 0.24s ease-out 0.03s;

      @include gt-sm {
        width: 32px;
        height: 32px;
      }

      @include lt-md {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
