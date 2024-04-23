<template>
  <div class="discount-content">
    <div class="layout row">
      <div class="col">
        <div class="title">
          {{ content.title }}
        </div>
        <div class="description">
          {{ content.description }}
        </div>
        <div class="buttons">
          <button
            v-for="(button, idx) in content.buttons"
            :key="idx"
            :class="{ active: idx === selectedIdx }"
            class="button"
            @click="handleClick(idx)"
          >
            {{ button.text }}
          </button>
        </div>
      </div>
      <div class="col">
        <img :src="content.img[deviceType]" :alt="content.img[deviceType]" class="img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiscountContent',

  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      selectedIdx: 0
    };
  },

  computed: {
    deviceType() {
      return this.$device.isMobileOrTablet ? 'mobile' : 'desktop';
    }
  },

  methods: {
    handleClick(idx) {
      this.selectedIdx = idx;
    }
  }
};
</script>

<style scoped lang="scss">
.discount-content {
  color: $color-dark-grey;

  @include gt-sm {
    padding: 80px 0;
  }

  @include lt-sm {
    padding: 40px 0;
  }
}

.row {
  display: flex;

  @include gt-sm {
    align-items: center;
  }

  @include lt-sm {
    flex-direction: column;
    gap: 20px;
    padding: 0 16px;
  }
}

.col {
  @include gt-sm {
    width: 50%;
  }

  &:first-child {
    @include gt-sm {
      padding-right: 27px;
    }

    @include lt-sm {
      order: 1;
    }
  }
}

.title {
  font-family: $Literata;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0;

  @include gt-sm {
    font-size: 24px;
    line-height: 28.8px;
  }

  @include lt-sm {
    font-size: 20px;
    line-height: 24px;
  }
}

.description {
  font-family: $golos-regular;
  font-size: 16px;
  line-height: 20.8px;
  letter-spacing: -0.02em;

  @include gt-sm {
    margin: 8px 0 27px;
  }

  @include lt-sm {
    margin: 10px 0 27px;
  }
}

.buttons {
  display: flex;
  gap: 12px;

  @include lt-sm {
    flex-direction: column;
  }
}

.button {
  flex: 1;
  font-family: $golos-medium;
  font-size: 16px;
  line-height: 24px;
  background: $bg-grey;
  border-radius: 12px;

  &:hover,
  &.active {
    background: $color-green;
    color: #fff;
  }

  @include gt-sm {
    min-height: 52px;
    padding: 0 14px;
  }

  @include lt-sm {
    min-height: 44px;
    padding: 0 10px;
  }
}

.img {
  display: block;

  @include gt-sm {
    max-width: 512px;
    margin-left: auto;
  }

  @include lt-sm {
    width: 100%;
  }
}
</style>
