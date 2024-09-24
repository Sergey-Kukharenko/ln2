<template>
  <figure class="app-image">
    <img
      v-show="!isError"
      v-observe-visibility="onVisibility"
      class="app-image__img"
      :class="{ loading: isLoading }"
      :src="srcImage"
      :srcset="srcsetImage"
      :style="styles"
      :width="width"
      :height="height"
      :alt="alt"
      @load="onLoad"
      @error="onError"
    />
    <svg-icon v-if="isError" class="app-image__no-image" name="no-image" />
    <div v-if="isLoading" class="app-image__loader" />
  </figure>
</template>

<script>
export default {
  name: 'AppImage',

  props: {
    path: {
      type: String,
      default: ''
    },

    alt: {
      type: String,
      required: true
    },

    width: {
      type: [Number, String],
      default: 254
    },

    height: {
      type: [Number, String],
      default: 254
    },

    lazy: {
      type: Boolean,
      default: false
    },

    rootMargin: {
      type: String,
      default: '0px'
    }
  },
  data() {
    return {
      isLoading: true,
      isError: false,
      isVisible: false,
      srcImage: '',
      srcsetImage:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    };
  },
  computed: {
    styles() {
      return {
        width: this.width,
        height: this.height
      };
    },

    src() {
      return this.path;
    },

    onVisibility() {
      return this.lazy
        ? {
            callback: this.setImageSrc,
            once: true,
            throttle: 300,
            intersection: {
              rootMargin: this.rootMargin
            },
            throttleOptions: {
              leading: 'visible'
            }
          }
        : this.setImageSrc(true);
    }
  },
  created() {
    this.srcImage = this.src;
    if (!this.lazy) {
      this.srcsetImage = this.src;
      this.isLoading = false;
      this.isVisible = true;
    }
  },
  methods: {
    setImageSrc(inView) {
      if (!inView) {
        return;
      }

      this.srcsetImage = this.src;
      this.isVisible = true;
    },

    onError() {
      this.isError = true;
      this.isLoading = false;
    },

    onLoad() {
      this.isLoading = !this.isVisible;
    }
  }
};
</script>

<style lang="scss">
.app-image {
  height: 100%;
  margin: 0;
  position: relative;

  &__logo-icon {
    width: 55%;
    height: auto;
    display: block;
  }

  &__no-image,
  &__loader {
    display: flex;
    flex: 1;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__loader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    transition: opacity 0.25s ease;

    &.loading {
      opacity: 0;
    }
  }
}
</style>
