<template>
  <div class="profile-personal-section">
    <div class="column">
      <profile-button-back />
      <div class="title">{{ title }}</div>
    </div>
    <div class="column">
      <div class="form">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import ProfileButtonBack from '~/components/profile/ProfileButtonBack.vue';

export default Vue.extend({
  name: 'ProfilePersonalSection',
  components: { ProfileButtonBack },

  props: {
    title: {
      type: String,
      default: ''
    }
  }
});
</script>

<style scoped lang="scss">
.profile-personal-section {
  display: flex;

  @include lt-md {
    flex-direction: column;
  }

  &:not(:first-child) {
    @include gt-sm {
      padding: 28px 0 32px;
    }

    @include lt-md {
      gap: 12px;
      padding: 0 0 24px;
    }
  }

  &:first-child {
    @include gt-sm {
      padding: 0 0 30px;
    }

    @include lt-md {
      gap: 16px;
      padding: 0 0 24px;

      & .title {
        margin-left: 32px;
      }
    }
  }

  &:not(:last-child) {
    border-bottom: 1px solid #eaeaea;
  }

  &:last-child {
    padding-bottom: 0;
  }
}

.column {
  @include gt-sm {
    width: 50%;
  }
}

.title {
  font-family: $Literata;
  font-weight: 700;

  @include gt-sm {
    font-size: 24px;
    line-height: 28px;
  }

  @include lt-md {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
  }
}

.form {
  display: flex;
  flex-direction: column;

  @include gt-sm {
    gap: 6px;
  }

  @include lt-md {
    gap: 12px;
  }
}

.link {
  font-family: $golos-bold;
  font-size: 14px;
  line-height: 20px;
  color: $color-green;
}
</style>
