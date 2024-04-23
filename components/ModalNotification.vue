<template>
  <app-modal theme="centered" :visible="isVisible" @close="$emit('close-modal')">
    <div class="modal-notification">
      <svg-icon class="close-icon" name="close" @click="$emit('close-modal')" />
      <svg-icon v-if="icon" :name="icon" class="unsubscribe-icon" />
      <div class="text" :class="textSize">{{ message }}</div>
      <nuxt-link to="/" class="link" @click="$emit('close-modal')">
        <app-button theme="green" stretch="full">Main page</app-button>
      </nuxt-link>
    </div>
  </app-modal>
</template>

<script>
import AppButton from '~/components/shared/AppButton.vue';
import AppModal from '~/components/shared/AppModal.vue';

export default {
  name: 'ModalNotification',
  components: { AppButton, AppModal },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },

    icon: {
      type: String,
      default: ''
    },

    message: {
      type: String,
      default: ''
    },

    textSize: {
      type: String,
      default: 'medium',
      validate(value) {
        return ['medium', 'large'].includes(value);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.modal-notification {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 24px;
  position: relative;
  box-sizing: border-box;

  @include gt-sm {
    width: 392px;
    padding: 24px;
  }

  @include lt-md {
    padding: 16px;
  }
}

.unsubscribe-icon {
  width: 60px;
  height: 60px;
}

.close-icon {
  user-select: none;
  width: 16px;
  height: 16px;
  position: absolute;
  top: 16px;
  right: 16px;

  @include gt-sm {
    display: none;
  }

  @include lt-md {
    display: block;
  }
}

.text {
  text-align: center;
  text-wrap: balance;

  &.medium {
    font-family: $golos-medium;
    text-align: center;
    color: $color-dark-grey;

    @include gt-sm {
      font-size: 16px;
      line-height: 17.6px;
      letter-spacing: -0.02px;
    }

    @include lt-md {
      font-size: 14px;
      line-height: 18.2px;
      letter-spacing: -0.01px;
    }
  }

  &.large {
    font-family: $Literata;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;

    @include gt-sm {
      font-size: 24px;
      letter-spacing: -0.24px;
    }

    @include lt-md {
      font-size: 20px;
      line-height: 120%;
      letter-spacing: -0.2px;
    }
  }
}

.link {
  display: block;
  width: 100%;
}
</style>
