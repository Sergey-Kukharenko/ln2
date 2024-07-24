<template>
  <div class="user">
    <div class="letter">{{ getLetter }}</div>
    <div class="name">{{ name }}</div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'ProfileSidebarUser',

  props: {
    name: {
      type: String,
      default: ''
    }
  },

  computed: {
    getLetter() {
      return this.name.charAt(0);
    }
  }
});
</script>

<style scoped lang="scss">
.user {
  display: flex;
  align-items: center;

  @include gt-sm {
    gap: 20px;
  }

  @include lt-md {
    gap: 10px;
  }
}

.letter {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $sana-black;

  color: #fff;
  background: rgba(247, 151, 168, 1);
  border-radius: 8px;

  @include gt-sm {
    width: 50px;
    height: 50px;
    font-size: 27.33px;
  }

  @include lt-md {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
}

.name {
  font-family: $golos-bold;
  font-size: 20px;
  line-height: 24px;

  @include gt-sm {
    font-size: 20px;
    line-height: 24px;
  }

  @include lt-md {
    font-size: 16px;
    line-height: 20px;
  }
}
</style>
