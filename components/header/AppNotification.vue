<template>
  <div class="notification" :class="classNames">
    <div class="layout layout--horizontal-dt">
      <div class="notification__title">
        {{ notification.title }}
      </div>
      <!--Временно скрыт-->
      <!--<svg-icon v-if="$device.isMobileOrTablet" name="close" />-->
    </div>
  </div>
</template>

<script>
import dataNotification from '@/data/notification';

export default {
  name: 'AppNotification',

  props: {
    theme: {
      type: String,
      default: 'pink',
      validate(value) {
        return ['green', 'pink'].includes(value);
      }
    }
  },

  data() {
    return {
      notification: {
        title: dataNotification.title
      }
    };
  },

  computed: {
    classNames() {
      return {
        [`notification--${this.theme}`]: this.theme
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.notification {
  position: relative;
  background: $color-red;

  &__title {
    font-family: $lora;
    font-style: normal;
    color: #ffffff;
    letter-spacing: -0.01em;
    text-align: center;

    @include gt-sm {
      font-weight: 700;
      font-size: 14px;
      line-height: 24px;
      padding: 10px 0;
    }

    @include lt-sm {
      max-width: 200px;
      font-weight: 500;
      font-size: 13px;
      line-height: 16px;
      padding: 8px 6px;
      margin: 0 auto;
    }
  }

  .icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: white;
    position: absolute;
    top: 0;
    right: 8px;
    bottom: 0;
    margin: auto;
  }
}

.notification--pink {
  background: $color-link-pink;
}

.notification--green {
  background: $color-dark-green;
}
</style>
