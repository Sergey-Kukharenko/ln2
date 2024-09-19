<template>
  <div class="dashboard-page">profile</div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'ProfilePage',

  layout: 'profile',

  middleware: 'profile-redirect'
});
</script>
