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
  gap: 20px;
}

.letter {
  width: 50px;
  height: 50px;
  background: rgba(247, 151, 168, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $sana-black;
  font-size: 27.33px;
  color: #fff;
  border-radius: 8px;
}

.name {
  font-family: $golos-bold;
  font-size: 20px;
  line-height: 24px;
}
</style>
