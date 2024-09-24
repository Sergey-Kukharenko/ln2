<template>
  <div ref="textarea-wrapper" :class="classNames" @click="onClick">
    <textarea ref="textarea" :value="value" :placeholder="placeholder" :maxlength="max" @input="onInput" />
    <div v-if="max" class="textarea__limit">
      <span :class="{ textarea__count: isReachedLimit }">{{ value.length }}</span
      >/{{ max }}
    </div>
  </div>
</template>

<script>
import { useClassName } from '@/helpers';

export default {
  name: 'AppTextarea',

  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    value: {
      type: [String],
      required: true,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    max: {
      type: [String, Number],
      default: 0
    },
    theme: {
      type: String,
      default: ''
    },
    autoSize: {
      type: Boolean,
      default: false
    },
    maxLengthValidation: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classNames() {
      return [useClassName({ theme: this.theme }, 'textarea'), useClassName({ theme: 'auto-size' }, 'textarea')];
    },

    isReachedLimit() {
      return this.value.length === this.max;
    }
  },

  mounted() {
    if (this.autoSize) {
      this.$nextTick(() => {
        this.$refs.textarea.style.height = '5px';
        this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
      });
    }
  },

  beforeDestroy() {
    document.removeEventListener('click', this.outClick);
  },

  methods: {
    onInput(event) {
      if (this.autoSize) {
        this.$refs.textarea.style.height = '5px';
        this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
      }

      this.$emit('input', event.target.value);
      document.removeEventListener('click', this.outClick);
      document.addEventListener('click', this.outClick);
    },

    onClick() {
      this.$refs.textarea.focus();
    },

    onBlur() {
      this.$emit('blur');
    },

    onFocus() {},

    outClick(event) {
      if (!this.$refs['textarea-wrapper'].contains(event.target)) {
        document.removeEventListener('click', this.outClick);
        this.$emit('blur');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.textarea {
  display: flex;
  gap: 16px;
  position: relative;

  background: $bg-grey;
  color: $color-dark-grey;
  border-radius: 10px;
  min-height: 140px;
  width: 100%;
  padding: 16px;
  font-family: $golos-regular;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
  cursor: text;

  &--white {
    background: #ffffff;
    color: $color-dark-grey;
    min-height: 100px;

    @include lt-md {
      min-height: 76px;
    }
  }

  &--auto-size {
    @include gt-sm {
      padding-bottom: 24px;
    }
  }

  &__limit {
    position: absolute;
    font-family: $golos-regular;
    color: $color-white-grey;
    font-weight: 400;
    letter-spacing: -0.02em;
    text-align: right;

    @include gt-sm {
      font-size: 12px;
      line-height: 16px;
      bottom: 16px;
      right: 16px;
    }

    @include lt-md {
      font-size: 10px;
      line-height: 14px;
      bottom: 10px;
      right: 10px;
    }
  }

  &__count {
    color: #db1838;
  }

  textarea {
    border: none;
    outline: none;
    background-color: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    width: 100%;
    height: 100%;
    resize: none;
    font-family: $golos-regular;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.01em;
    overflow: hidden;

    &::placeholder {
      font-family: $golos-regular;
      font-style: normal;
      font-size: 14px;
      line-height: 20px;
      color: $color-white-grey;

      @include lt-md {
        font-size: 12px;
      }
    }
  }
}
</style>
